import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
const destination = `${siteUrl}/menu`;
await mkdir("public/qr", { recursive: true });
await QRCode.toFile("public/qr/goat-menu-qr.svg", destination, { type: "svg", errorCorrectionLevel: "H", margin: 4, color: { dark: "#0D0D0D", light: "#F5F1E8" } });
await QRCode.toFile("public/qr/goat-menu-qr.png", destination, { type: "png", errorCorrectionLevel: "H", margin: 4, width: 1200, color: { dark: "#0D0D0D", light: "#F5F1E8" } });
console.log(`Generated static QR for ${destination}`);
