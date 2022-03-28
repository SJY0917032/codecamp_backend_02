import express from "express";

import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// 상품 구매
app.post("/products/buy", (req, res) => {
  // 1.가진돈을 검증한다.
  const cv = new CashService(); // true or false
  const hasMoney = cv.checkValue();

  // 2. 판매여부를 검증한다
  const ps = new ProductService(); // true or false
  const isSoldOut = ps.checkSoldOut();

  if (hasMoney && !isSoldOut) {
    res.send("상품 구매 완료");
  }
});

// 상품 환불
app.post("/products/refund", (req, res) => {
  // 판매여부 검증
  const ps = new ProductService();
  const isSoldOut = ps.checkSoldOut();

  if (!isSoldOut) {
    res.send("상품 환불 완료");
  }
});

app.listen(3000);
