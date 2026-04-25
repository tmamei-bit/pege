import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "C:/Users/mtnnk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"
);

const root = process.cwd();
const outputDir = resolve(root, "output", "playwright");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
await page.goto(pathToFileURL(resolve(root, "index.html")).href, { waitUntil: "networkidle" });

const title = await page.title();
const brokenImages = await page.$$eval("img", (imgs) =>
  imgs
    .filter((img) => !img.complete || img.naturalWidth === 0)
    .map((img) => img.getAttribute("src"))
);

await page.screenshot({ path: resolve(outputDir, "desktop.png"), fullPage: true });
await page.setViewportSize({ width: 390, height: 1100 });
await page.screenshot({ path: resolve(outputDir, "mobile.png"), fullPage: true });

await browser.close();

console.log(JSON.stringify({ title, brokenImages }, null, 2));
