const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "dist", "android-web");
const files = ["index.html", "styles.css", "app.js", "manifest.json", "service-worker.js"];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(rootDir, file), path.join(outDir, file));
}

console.log(`Prepared Android web assets in ${path.relative(rootDir, outDir)}`);
