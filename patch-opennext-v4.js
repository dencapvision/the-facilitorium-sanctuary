const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const file = 'node_modules/@opennextjs/cloudflare/dist/cli/build/utils/copy-package-cli-files.js';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Patch fs.cpSync with robocopy
  content = content.replace(
    'fs.cpSync(sourceDir, destinationDir, { recursive: true });',
    `console.log("DEBUG: robocopy templates from " + sourceDir + " to " + destinationDir);
     try {
       execSync('robocopy "' + sourceDir + '" "' + destinationDir + '" /E /NFL /NDL /NJH /NJS /nc /ns /np');
     } catch (e) {
       if (e.status && e.status > 8) throw e;
     }
    `
  );
  
  fs.writeFileSync(file, content);
}
