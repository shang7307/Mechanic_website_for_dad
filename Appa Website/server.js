/**
 * JayaChandran N — Two-Wheeler Service & Repair Workshop
 * Lightweight Zero-Dependency Local HTTP Server
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') {
    reqUrl = '/index.html';
  }

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title><style>body{background:#131315;color:#e5e1e4;font-family:sans-serif;padding:3rem;text-align:center;}a{color:#ff5708;}</style></head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>The requested URL <code>${reqUrl}</code> was not found on this server.</p>
  <p><a href="/">Return to JayaChandran N Workshop Homepage &rarr;</a></p>
</body>
</html>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  JayaChandran N — Two-Wheeler Service Website`);
  console.log(`  Local Server is running!`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Blue Variant: http://localhost:${PORT}/blue-theme.html`);
  console.log(`======================================================\n`);
});
