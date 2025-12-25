#!/usr/bin/env node

/**
 * Generate SVG files from Mermaid diagram files (.mmd)
 * 
 * This script finds all .mmd files in the project and generates
 * corresponding .svg files using @mermaid-js/mermaid-cli.
 * 
 * Usage:
 *   node scripts/generateMermaidSvgs.js              # Generate all SVGs
 *   node scripts/generateMermaidSvgs.js <path>        # Generate SVG for specific file
 *   node scripts/generateMermaidSvgs.js --check       # Check for missing SVGs
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, basename, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * Find all .mmd files in the project
 * @param {string} rootDir - Root directory to search
 * @param {string[]} ignoreDirs - Directories to ignore (e.g., node_modules)
 * @returns {string[]} Array of absolute paths to .mmd files
 */
function findMmdFiles(rootDir, ignoreDirs = ['node_modules', '.git', 'dist', 'coverage']) {
  const mmdFiles = [];
  
  function walkDir(dir) {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        const dirName = basename(fullPath);
        if (!ignoreDirs.includes(dirName) && !dirName.startsWith('.')) {
          walkDir(fullPath);
        }
      } else if (stat.isFile() && extname(entry) === '.mmd') {
        mmdFiles.push(fullPath);
      }
    }
  }
  
  walkDir(rootDir);
  return mmdFiles;
}

/**
 * Generate SVG from MMD file using mermaid-cli
 * @param {string} mmdPath - Path to .mmd file
 * @returns {boolean} True if successful, false otherwise
 */
function generateSvg(mmdPath) {
  const svgPath = mmdPath.replace(/\.mmd$/, '.svg');
  const mmdDir = dirname(mmdPath);
  const mmdFile = basename(mmdPath);
  const svgFile = basename(svgPath);
  
  try {
    console.log(`Generating: ${relative(projectRoot, mmdPath)} → ${relative(projectRoot, svgPath)}`);
    
    // Use npx to run mermaid-cli without requiring global installation
    execSync(
      `npx --yes @mermaid-js/mermaid-cli -i "${mmdFile}" -o "${svgFile}"`,
      {
        cwd: mmdDir,
        stdio: 'inherit',
      }
    );
    
    // Verify SVG was created
    if (existsSync(svgPath)) {
      console.log(`✓ Successfully generated: ${relative(projectRoot, svgPath)}\n`);
      return true;
    } else {
      console.error(`✗ Error: SVG file was not created: ${relative(projectRoot, svgPath)}\n`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error generating SVG for ${relative(projectRoot, mmdPath)}:`);
    console.error(`  ${error.message}\n`);
    return false;
  }
}

/**
 * Check for missing SVG files
 * @param {string[]} mmdFiles - Array of .mmd file paths
 * @returns {Object} Object with missing and existing SVG info
 */
function checkSvgs(mmdFiles) {
  const missing = [];
  const existing = [];
  
  for (const mmdPath of mmdFiles) {
    const svgPath = mmdPath.replace(/\.mmd$/, '.svg');
    if (existsSync(svgPath)) {
      existing.push(mmdPath);
    } else {
      missing.push(mmdPath);
    }
  }
  
  return { missing, existing };
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const specificFile = args.find(arg => !arg.startsWith('--') && arg.endsWith('.mmd'));
  
  console.log('Mermaid SVG Generator\n');
  
  if (specificFile) {
    // Generate SVG for specific file
    const mmdPath = join(process.cwd(), specificFile);
    if (!existsSync(mmdPath)) {
      console.error(`Error: File not found: ${specificFile}`);
      process.exit(1);
    }
    if (extname(mmdPath) !== '.mmd') {
      console.error(`Error: File must have .mmd extension: ${specificFile}`);
      process.exit(1);
    }
    
    const success = generateSvg(mmdPath);
    process.exit(success ? 0 : 1);
  } else {
    // Find all MMD files
    const mmdFiles = findMmdFiles(projectRoot);
    
    if (mmdFiles.length === 0) {
      console.log('No .mmd files found in the project.');
      process.exit(0);
    }
    
    console.log(`Found ${mmdFiles.length} .mmd file(s):\n`);
    mmdFiles.forEach(file => {
      console.log(`  - ${relative(projectRoot, file)}`);
    });
    console.log();
    
    if (checkOnly) {
      // Check mode: report missing SVGs
      const { missing, existing } = checkSvgs(mmdFiles);
      
      if (existing.length > 0) {
        console.log(`✓ ${existing.length} SVG file(s) exist:\n`);
        existing.forEach(file => {
          const svgPath = file.replace(/\.mmd$/, '.svg');
          console.log(`  ✓ ${relative(projectRoot, svgPath)}`);
        });
        console.log();
      }
      
      if (missing.length > 0) {
        console.log(`✗ ${missing.length} SVG file(s) missing:\n`);
        missing.forEach(file => {
          const svgPath = file.replace(/\.mmd$/, '.svg');
          console.log(`  ✗ ${relative(projectRoot, svgPath)}`);
        });
        console.log();
        console.log('Run without --check to generate missing SVGs.');
        process.exit(1);
      } else {
        console.log('✓ All MMD files have corresponding SVG files.');
        process.exit(0);
      }
    } else {
      // Generate mode: generate all SVGs
      let successCount = 0;
      let failCount = 0;
      
      for (const mmdPath of mmdFiles) {
        if (generateSvg(mmdPath)) {
          successCount++;
        } else {
          failCount++;
        }
      }
      
      console.log('\n--- Summary ---');
      console.log(`Total files: ${mmdFiles.length}`);
      console.log(`✓ Success: ${successCount}`);
      if (failCount > 0) {
        console.log(`✗ Failed: ${failCount}`);
      }
      
      process.exit(failCount > 0 ? 1 : 0);
    }
  }
}

// Run main function
main();

