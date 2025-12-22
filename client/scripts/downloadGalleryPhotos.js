import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GALLERY_DIR = path.join(__dirname, '../resources/gallery');
const TOTAL_PHOTOS = 500;
const KEYWORDS = ['eyelash', 'manicure', 'nails', 'nail art', 'beauty'];
const PHOTOS_PER_KEYWORD = Math.ceil(TOTAL_PHOTOS / KEYWORDS.length);

// Ensure gallery directory exists
if (!fs.existsSync(GALLERY_DIR)) {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
}

/**
 * Get Unsplash image URL using Picsum Photos (more reliable for bulk downloads)
 * Picsum provides random images and we can use it as a fallback
 * For actual Unsplash images, we'll use direct URLs with photo IDs
 */
function getImageUrl(keyword, index, photoIndex) {
  // Use Picsum Photos which is more reliable for bulk downloads
  // Format: https://picsum.photos/800/800?random={seed}
  const seed = photoIndex * 1000 + index;
  return `https://picsum.photos/800/800?random=${seed}`;
}

/**
 * Download a single image
 */
async function downloadImage(keyword, index, photoIndex) {
  try {
    const url = getImageUrl(keyword, index, photoIndex);
    
    console.log(`Downloading photo ${photoIndex + 1}/${TOTAL_PHOTOS} (${keyword})...`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      // Add timeout
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Verify it's actually an image (check first bytes)
    const header = buffer.toString('hex', 0, 4);
    if (!header.startsWith('ffd8') && !header.startsWith('8950') && !header.startsWith('4749')) {
      throw new Error('Downloaded file is not a valid image');
    }
    
    // Generate filename
    const filename = `gallery-${String(photoIndex + 1).padStart(4, '0')}-${keyword.replace(/\s+/g, '-')}.jpg`;
    const filepath = path.join(GALLERY_DIR, filename);
    
    fs.writeFileSync(filepath, buffer);
    console.log(`✓ Saved: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    
    return {
      id: `g${photoIndex + 1}`,
      filename,
      url: `/resources/gallery/${filename}`,
      keyword,
      success: true,
      size: buffer.length
    };
  } catch (error) {
    console.error(`✗ Failed to download photo ${photoIndex + 1} (${keyword}):`, error.message);
    return {
      id: `g${photoIndex + 1}`,
      keyword,
      success: false,
      error: error.message
    };
  }
}

/**
 * Download all photos with delay between requests to avoid rate limiting
 */
async function downloadAllPhotos() {
  const results = [];
  let photoIndex = 0;
  
  console.log(`Starting download of ${TOTAL_PHOTOS} photos...`);
  console.log(`Keywords: ${KEYWORDS.join(', ')}`);
  console.log(`Saving to: ${GALLERY_DIR}\n`);

  for (const keyword of KEYWORDS) {
    const photosForKeyword = photoIndex + PHOTOS_PER_KEYWORD <= TOTAL_PHOTOS 
      ? PHOTOS_PER_KEYWORD 
      : TOTAL_PHOTOS - photoIndex;
    
    for (let i = 0; i < photosForKeyword && photoIndex < TOTAL_PHOTOS; i++) {
      const result = await downloadImage(keyword, i, photoIndex);
      results.push(result);
      photoIndex++;
      
      // Add delay to avoid rate limiting (300ms between requests)
      if (photoIndex < TOTAL_PHOTOS) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Progress update every 50 photos
      if (photoIndex % 50 === 0) {
        const successful = results.filter(r => r.success).length;
        console.log(`\nProgress: ${photoIndex}/${TOTAL_PHOTOS} (${successful} successful)\n`);
      }
    }
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n=== Download Complete ===`);
  console.log(`Total: ${TOTAL_PHOTOS}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    console.log(`\nFailed downloads:`);
    results.filter(r => !r.success).slice(0, 10).forEach(r => {
      console.log(`  - Photo ${r.id} (${r.keyword}): ${r.error}`);
    });
    if (failed > 10) {
      console.log(`  ... and ${failed - 10} more`);
    }
  }
  
  // Save metadata
  const metadata = {
    total: TOTAL_PHOTOS,
    successful,
    failed,
    downloadedAt: new Date().toISOString(),
    photos: results.filter(r => r.success).map(r => ({
      id: r.id,
      filename: r.filename,
      url: r.url,
      keyword: r.keyword,
      size: r.size
    }))
  };
  
  const metadataPath = path.join(GALLERY_DIR, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`\nMetadata saved to: ${metadataPath}`);
  
  return results;
}

// Run the download
downloadAllPhotos()
  .then(() => {
    console.log('\n✓ All downloads completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Fatal error:', error);
    process.exit(1);
  });
