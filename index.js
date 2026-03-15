const { chromium } = require('playwright-core');
const http = require('http');

const PORT = process.env.PORT || 3000;
const TARGET_URL = 'https://gumyfui.com?directlink=1&code_type=1&sid=941721';

async function visitPage() {
  try {
    const browser = await chromium.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const title = await page.title();
    console.log('Visited! Title: ' + title);
    await browser.close();
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

visitPage();

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Playwright server is running\n');
});

server.listen(PORT, () => console.log('Server running on port ' + PORT));
