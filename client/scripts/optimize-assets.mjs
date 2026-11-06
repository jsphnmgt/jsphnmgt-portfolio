import { readdir, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

// Preserve source artwork; the runtime uses these smaller, generated WebP files.
const root = fileURLToPath(new URL('../src/assets/', import.meta.url));
const output = path.join(root, 'optimized');
await mkdir(output, { recursive: true });
const excluded = new Set(['optimized', 'mockup', 'design-system', 'screenshots']);
// Optionally process selected asset folders: node scripts/optimize-assets.mjs projects
const selectedFolders = new Set(process.argv.slice(2));
let before = 0;
let after = 0;
let count = 0;
for (const directory of await readdir(root, { withFileTypes: true })) {
  if (!directory.isDirectory() || excluded.has(directory.name)) continue;
  if (selectedFolders.size && !selectedFolders.has(directory.name)) continue;
  for (const name of await readdir(path.join(root, directory.name))) {
    if (!/\.(png|jpe?g|webp|avif)$/i.test(name)) continue;
    const source = path.join(root, directory.name, name);
    const target = path.join(output, `${name}.webp`);
    const width = directory.name === 'room' || directory.name === 'backgrounds' ? 1920
      : directory.name === 'certificates' ? 1600
      : directory.name === 'projects' ? 1600
      : directory.name === 'portfolio' ? 1440
      : directory.name === 'personal-computer' ? 1280 : 640;
    await sharp(source).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 100, effort: 6 }).toFile(target);
    before += (await stat(source)).size;
    after += (await stat(target)).size;
    count++;
  }
}
console.log(`${count} images: ${(before / 1e6).toFixed(2)} MB → ${(after / 1e6).toFixed(2)} MB (${Math.round((1 - after / before) * 100)}% smaller)`);
