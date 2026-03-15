const { chromium } = require('playwright');
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/visit') {
    try {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto('https://example.com');
      const title = await page.title();
      await browser.close();
      res.writeHead(200);
      res.end('Title: ' + title);
    } catch (err) {
      res.writeHead(500);
      res.end('Error: ' + err.message);
    }
  } else {
    res.writeHead(200);
    res.end('Playwright server is running');
  }
});

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
