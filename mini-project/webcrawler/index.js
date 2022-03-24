import puppeteer from "puppeteer";
// import mongoose from "mongoose"; TODO : 디비연결 및 저장
// import { Coffee } from "./models/coffee.model.js"

async function starbucksCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(500);

  for (let i = 1; i <= 10; i++) {
    // 제품명
    const name = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(8) > ul > li:nth-child(${i}) > dl > dd`,
      (el) => el.textContent
    );
    // 사진
    const img = await page.$eval(
      `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(8) > ul > li:nth-child(${i}) > dl > dt > a > img`,
      (el) => el.getAttribute("src")
    );
        //  TODO: 디비에저장
    console.log(`제품명 : ${name}
                 사진링크 : ${img}`)
  }

  await browser.close()
}

starbucksCrawling();