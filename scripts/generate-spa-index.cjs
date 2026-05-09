const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const clientDir = path.join(projectRoot, 'dist', 'client');
const assetsDir = path.join(clientDir, 'assets');

if (!fs.existsSync(clientDir) || !fs.existsSync(assetsDir)) {
  console.error('dist/client or dist/client/assets not found. Run `vite build` first.');
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);
const jsFile = files.find((f) => /^index-.*\.js$/.test(f));
const cssFile = files.find((f) => /^styles-.*\.css$/.test(f));

if (!jsFile) {
  console.error('Could not find client JS entry (index-*.js) in dist/client/assets');
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Happy Birthday Ghefira</title>
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}">` : ''}
</head>
<body>
  <script>
    window.__TSR__ = {
      matches: [],
      streamedValues: {}
    };
  </script>
  <script type="module" src="/assets/${jsFile}"></script>
</body>
</html>`;

fs.writeFileSync(path.join(clientDir, 'index.html'), html);
console.log('Wrote dist/client/index.html');
