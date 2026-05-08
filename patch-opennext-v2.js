const fs = require('fs');
const path = require('path');
const file = 'node_modules/@opennextjs/aws/dist/build/helper.js';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Patch initOutputDir to be more robust and log everything
  const originalInit = 'fs.cpSync(options.tempBuildDir, buildDir, { recursive: true });';
  const patchedInit = `
    console.log('DEBUG: Manual copy from ' + options.tempBuildDir + ' to ' + buildDir);
    if (fs.existsSync(options.tempBuildDir)) {
      const files = fs.readdirSync(options.tempBuildDir);
      console.log('DEBUG: Files in temp:', files);
      for (const f of files) {
        const src = path.join(options.tempBuildDir, f);
        const dest = path.join(buildDir, f);
        try {
          fs.copyFileSync(src, dest);
          console.log('DEBUG: Copied ' + f);
        } catch (e) {
          console.error('DEBUG: Failed to copy ' + f, e);
        }
      }
    }
  `;
  
  content = content.replace(originalInit, patchedInit);
  
  // Patch copyOpenNextConfig to log more
  const originalCopy = 'fs.copyFileSync(path.join(inputDir, isEdge ? "open-next.config.edge.mjs" : "open-next.config.mjs"), path.join(outputDir, "open-next.config.mjs"));';
  const patchedCopy = `
    const srcName = isEdge ? "open-next.config.edge.mjs" : "open-next.config.mjs";
    const src = path.join(inputDir, srcName);
    const dest = path.join(outputDir, "open-next.config.mjs");
    console.log('DEBUG: copyOpenNextConfig src=' + src + ' dest=' + dest);
    if (!fs.existsSync(src)) {
      console.error('DEBUG: SOURCE MISSING IN copyOpenNextConfig: ' + src);
      const buildFiles = fs.readdirSync(inputDir);
      console.log('DEBUG: Files in inputDir (' + inputDir + '):', buildFiles);
    }
    fs.copyFileSync(src, dest);
  `;
  
  content = content.replace(originalCopy, patchedCopy);
  
  fs.writeFileSync(file, content);
}
