import { spawn } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.env.RESPONSIVE_BASE_URL || "http://127.0.0.1:3000";
const browser = process.env.BROWSER_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9333 + Math.floor(Math.random() * 300);
const profile = await mkdtemp(join(tmpdir(), "goat-responsive-"));
const child = spawn(browser, ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

async function retry(url, options) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try { return await fetch(url, options); } catch { await new Promise((resolve) => setTimeout(resolve, 200)); }
  }
  throw new Error("Browser debugging endpoint did not start");
}

try {
  await retry(`http://127.0.0.1:${port}/json/version`);
  const target = await (await retry(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => { const message = JSON.parse(event.data); if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); } });
  const send = (method, params = {}) => new Promise((resolve) => { id += 1; pending.set(id, resolve); socket.send(JSON.stringify({ id, method, params })); });
  await send("Page.enable");
  await send("Runtime.enable");
  const widths = [320, 375, 768, 1024, 1440, 1920];
  const paths = ["/en", "/es", "/en/menu", "/es/menu", "/en/promotions", "/es/promociones"];
  const failures = [];
  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
    for (const path of paths) {
      await send("Page.navigate", { url: `${baseUrl}${path}` });
      let metrics;
      for (let attempt = 0; attempt < 30; attempt += 1) {
        const response = await send("Runtime.evaluate", { expression: "JSON.stringify({width: innerWidth, scrollWidth: document.documentElement.scrollWidth, lang: document.documentElement.lang, path: location.pathname})", returnByValue: true });
        const serialized = response?.result?.result?.value;
        if (typeof serialized === "string") {
          const value = JSON.parse(serialized);
          if (value.path === path && value.lang && Math.abs(value.width - width) <= 1) { metrics = value; break; }
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      if (!metrics) throw new Error(`Timed out waiting for ${path}`);
      const expectedLang = path.startsWith("/es") ? "es" : "en";
      const ok = Math.abs(metrics.width - width) <= 1 && metrics.scrollWidth <= metrics.width && metrics.lang === expectedLang;
      console.log(`${ok ? "PASS" : "FAIL"} ${width}px ${path} viewport=${metrics.width} scroll=${metrics.scrollWidth} lang=${metrics.lang}`);
      if (!ok) failures.push({ width, path, metrics });
    }
  }
  socket.close();
  if (failures.length) throw new Error(`${failures.length} responsive checks failed`);
} finally {
  child.kill();
}
