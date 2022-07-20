const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://food.grab.com/sg/en/");
  await page.type("input", "Singapore");
  await page.click(".submitBtn___2roqB");
  //click on load_more while it is not disabled

  //click on every restaurant
  //get the lat lang data from network tab
  //go back

  const elHandleArr = await page.$$(".realImage___2TyNE show___3oA6B");
  let arr = [];

  elHandleArr.map(async (el) => {
    await el.evaluate((b) => b.click());
    page.on("request", (req) => {
      console.log(req.headers());
      arr.push(req.headers());
    });
    await page.goBack();
    page.waitFor(1000);
  });

  console.log(arr);

  // await browser.close();
})();
