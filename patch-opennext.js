const fs = require('fs');
const path = require('path');
const file = 'node_modules/@opennextjs/cloudflare/dist/cli/build/build.js';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    'logger.info(`App directory: ${options.appPath}`);',
    'logger.info(`App directory: ${options.appPath}`); console.log(`DEBUG: tempBuildDir = ${options.tempBuildDir}`); console.log(`DEBUG: outputDir = ${options.outputDir}`);'
  );
  // Also patch the problematic copyOpenNextConfig call to add more logging
  content = content.replace(
    'await createMiddleware(options, { forceOnlyBuildOnce: true });',
    'console.log("DEBUG: Before createMiddleware"); await createMiddleware(options, { forceOnlyBuildOnce: true }); console.log("DEBUG: After createMiddleware");'
  );
  fs.writeFileSync(file, content);
}
