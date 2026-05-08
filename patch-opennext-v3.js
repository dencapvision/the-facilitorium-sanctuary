const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const file = 'node_modules/@opennextjs/aws/dist/build/createAssets.js';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Patch createStaticAssets to use robocopy for robustness
  content = content.replace(
    'fs.cpSync(path.join(appBuildOutputPath, ".next/static"), path.join(outputPath, "_next", "static"), { recursive: true });',
    `
    const srcDir = path.join(appBuildOutputPath, ".next/static");
    const destDir = path.join(outputPath, "_next", "static");
    console.log("DEBUG: robocopy from " + srcDir + " to " + destDir);
    fs.mkdirSync(destDir, { recursive: true });
    try {
      // robocopy exit codes: 0: No files copied, 1: Files copied, 2: Extra files, 3: 1+2, etc. >8: Error
      execSync('robocopy "' + srcDir + '" "' + destDir + '" /E /NFL /NDL /NJH /NJS /nc /ns /np');
      console.log("DEBUG: robocopy finished successfully");
    } catch (e) {
      if (e.status && e.status > 8) {
        console.error("DEBUG: robocopy FAILED with status " + e.status);
        throw e;
      }
      console.log("DEBUG: robocopy finished with status " + (e.status || 0));
    }
    `
  );

  // Also patch the public path copy if it exists
  content = content.replace(
    'fs.cpSync(appPublicPath, outputPath, {',
    `
    console.log("DEBUG: robocopy public assets from " + appPublicPath + " to " + outputPath);
    try {
      execSync('robocopy "' + appPublicPath + '" "' + outputPath + '" /E /NFL /NDL /NJH /NJS /nc /ns /np');
    } catch (e) {
      if (e.status && e.status > 8) throw e;
    }
    if (false) fs.cpSync(appPublicPath, outputPath, {
    `
  );
  
  fs.writeFileSync(file, content);
}
