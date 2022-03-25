import puppeteer from "puppeteer";
import mongoose from "mongoose"; 
mongoose.connect("mongodb://localhost:27017/camp");
import { StarBucks } from "./models/coffee.model.js"

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
    
    const coffee = await new StarBucks({
      name : name,
      img : img,
    })
    await coffee.save()
    console.log(`커피 : ${name}를 긁어와 저장했읍니다..`);
  }

  
  await browser.close()
}

starbucksCrawling();