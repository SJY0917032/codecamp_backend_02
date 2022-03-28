import express from "express";

const app = express();

// 상품 구매
app.post("/products/buy", (req, res) => {
  // 1. 유저의 현금상태 검증
  // ...
  // ...

  // 2. 판매 여부 검증
  // ...
  // ...

  // 3. 상품 구매
  // ...
  // ...

  res.send("상품 구매 완료");
});

// 상품 환불
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부를 검증한다.
  // ....
  // 2. 상품 환불
  // if(!판매중){
  res.send("상품 환불 완료");
  //  }
});

app.listen(3000);
