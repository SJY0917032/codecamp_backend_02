import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930");
  await page.waitForTimeout(500);

  const framepage = await page
    .frames()
    .find((el) => el.url().includes("/item/sise_day.naver?code=005930"));

  for (let i = 3; i < 8; i++) {
    const price = await framepage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );
    const day = await framepage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );
    console.log(`날짜 : ${day} - 가격 : ${price}원`);
  }

  await browser.close();
}

startCrawling();
