const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const sites = [
  { dir: "web-dev", out: "web-dev", base: "/web-dev/" },
  { dir: "intro-python", out: "intro-python", base: "/intro-python/" },
  { dir: "game-dev", out: "game-dev", base: "/game-dev/" },
];

const distDir = path.join(root, "dist");
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true });

for (const s of sites) {
  const sitePath = path.join(root, s.dir);
  const outPath = path.resolve(distDir, s.out);
  console.log(`\n=== Building ${s.out} ===`);
  execSync("npm install --no-audit --no-fund", { cwd: sitePath, stdio: "inherit" });
  execSync(`npm run build -- --base=${s.base} --outDir="${outPath}"`, {
    cwd: sitePath,
    stdio: "inherit",
  });
}

fs.copyFileSync(path.join(root, "root-index.html"), path.join(distDir, "index.html"));
console.log("\n=== All three sites built to dist/ ===");
