import { transform } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";

for (const [file, loader] of [["dist/site.js", "js"], ["dist/site.css", "css"]]) {
  const src = await readFile(file, "utf8");
  const { code } = await transform(src, { loader, minify: true });
  await writeFile(file, code);
  console.log(`${file}: ${src.length} -> ${code.length} bytes`);
}
