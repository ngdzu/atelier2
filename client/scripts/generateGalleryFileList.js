import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read actual files from the public gallery directory (where images are served from)
const galleryDir = path.join(__dirname, '../public/gallery');

if (!fs.existsSync(galleryDir)) {
  console.error(`Gallery directory does not exist: ${galleryDir}`);
  console.error(`Creating directory: ${galleryDir}`);
  fs.mkdirSync(galleryDir, { recursive: true });
}

// Get all image files from the directory (excluding metadata.json)
const files = fs.readdirSync(galleryDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  })
  .sort(); // Sort alphabetically for consistent ordering

console.log(`Found ${files.length} image files in ${galleryDir}`);

// Generate TypeScript file with the filenames
const outputPath = path.join(__dirname, '../utils/galleryFileList.ts');
const content = `// Auto-generated file - DO NOT EDIT
// This file contains the actual filenames from public/gallery/
// Generated at: ${new Date().toISOString()}
// Only files that actually exist in the directory are included

export const GALLERY_FILENAMES: string[] = ${JSON.stringify(files, null, 2)};

export const GALLERY_FILE_COUNT = ${files.length};
`;

fs.writeFileSync(outputPath, content);
console.log(`Generated ${outputPath} with ${files.length} filenames`);
