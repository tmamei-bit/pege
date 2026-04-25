import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "C:/Users/mtnnk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"
);

const widths = [1440, 1024, 768, 390];
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const page = await browser.newPage();
const url = pathToFileURL(resolve(process.cwd(), "index.html")).href;
const results = [];

for (const width of widths) {
  await page.setViewportSize({ width, height: 1200 });
  await page.goto(url, { waitUntil: "networkidle" });
  const issues = await page.evaluate(() => {
    return [...document.querySelectorAll("h1 .line, h2 .line, h3 .line")].flatMap((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = [...range.getClientRects()];
      const visibleRects = rects.filter((rect) => rect.width > 1 && rect.height > 1);
      const box = el.getBoundingClientRect();
      const parentBox = el.parentElement.getBoundingClientRect();
      const wraps = visibleRects.length > 1;
      const overflows = box.width > parentBox.width + 1 || box.right > parentBox.right + 1;
      return wraps || overflows
        ? [{
            text: el.textContent.trim(),
            wraps,
            overflows,
            rectCount: visibleRects.length,
          }]
        : [];
    });
  });
  results.push({ width, issues });
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
