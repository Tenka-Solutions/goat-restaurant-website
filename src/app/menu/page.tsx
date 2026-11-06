import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

// Keep old printed QR codes functional without serving outdated dishes or prices.
export default function MenuRedirect() {
  redirect(siteConfig.publicMenuUrl);
}
