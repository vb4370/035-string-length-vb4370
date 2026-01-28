const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should save the length of the string variable named quote in a variable named quoteLength', async () => {
    const quoteLength = await page.evaluate(() => quoteLength);
    const quote = await page.evaluate(() => quote);
    expect(quoteLength).toBe(quote.length);
  });
  
  it('should save the twenty-second character in the quote in a variable named twentySecondLetter', async () => {
    const twentySecondLetter = await page.evaluate(() => twentySecondLetter);
    const quote = await page.evaluate(() => quote);
    expect(twentySecondLetter).toBe(quote[21]);
  });
  
  it('should create a string variable named output that contains the quoteLength', async () => {
    const output = await page.evaluate(() => output);
    const quoteLength = await page.evaluate(() => quoteLength);
    expect(output).toContain(`${quoteLength}`);
  });
  
  it('should modify the string variable named output to also contain the twentySecondLetter between two brackets ([])', async () => {
    const output = await page.evaluate(() => output);
    const twentySecondLetter = await page.evaluate(() => twentySecondLetter);
    expect(output).toContain(`[${twentySecondLetter}]`);
  });
  
  it('should assign the innerHTML of the HTML element with the id result to the output', async () => {
    const output = await page.evaluate(() => output);
    const innerHtml = await page.$eval("#result", (result) => {
      return result.innerHTML;
    });
      
    expect(innerHtml).toBe(output);
  });
});

