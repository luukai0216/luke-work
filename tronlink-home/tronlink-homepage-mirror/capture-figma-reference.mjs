/**
 * 在 1920 宽视口下对本地 index.html 全页截图，供拖入 Figma 作 1920 宽画板参考。
 *
 * 运行（会临时下载 Chromium，需网络）:
 *   npx -p puppeteer node capture-figma-reference.mjs
 */
import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "figma-export");
const OUT = path.join(OUT_DIR, "tronlink-mirror-1920-full.png");

const indexPath = path.join(__dirname, "index.html");
if (!existsSync(indexPath)) {
  console.error("index.html not found at", indexPath);
  process.exit(1);
}
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto("file://" + indexPath, { waitUntil: "networkidle2", timeout: 120000 });
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: OUT, fullPage: true, type: "png" });
await browser.close();
console.log("Wrote", OUT);
