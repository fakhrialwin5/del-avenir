import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const dir = './public/images/muhadhoroh';
const files = await readdir(dir);

for (const file of files) {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const input = join(dir, file);
    const output = join(dir, file.replace(/\.(png|jpg)$/, '.webp'));
    
    try {
      const info = await sharp(input)
        .resize(1200, 800, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(output);
      
      const originalSize = (await stat(input)).size;
      const newSize = info.size;
      console.log(`${file}: ${(originalSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (${((1-newSize/originalSize)*100).toFixed(0)}% reduction)`);
    } catch (e) {
      console.error(`Error processing ${file}:`, e.message);
    }
  }
}
