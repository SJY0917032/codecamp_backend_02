/**
 * 회원 목록을 조회하는 API
 */

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
const openapi = swaggerJsdoc(options);
const port = 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/users", (req, res) => {
  const users = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "01012345678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bbb@gmail.com",
      name: "철철이",
      phone: "01098765432",
      personal: "123456-789123",
      prefer: "https://naver2.com",
    },
    {
      email: "ccc@gmail.com",
      name: "철철삼",
      phone: "01011911121",
      personal: "456789-123456",
      prefer: "https://naver3.com",
    },
    {
      email: "ddd@gmail.com",
      name: "철철사",
      phone: "01056781234",
      personal: "789123-456789",
      prefer: "https://naver4.com",
    },
    {
      email: "eee@gmail.com",
      name: "철철오",
      phone: "01045677891",
      personal: "123456-789123",
      prefer: "https://naver5.com",
    },
  ];

  res.send(users);
});

app.get("/starbucks", (req, res) => {
  const coffee = [
    { name: "아메리카노", kcal: 0 },
    { name: "카푸치노", kcal: 10 },
    { name: "제주말차프라푸치노", kcal: 1 },
    { name: "녹차라떼", kcal: 2 },
    { name: "민트초코프라페", kcal: 700 },
    { name: "민트초코라떼", kcal: 3 },
    { name: "녹차라떼투샷추가", kcal: 4 },
    { name: "아이스티", kcal: 999 },
    { name: "쌍화탕", kcal: 200 },
    { name: "카페라떼", kcal: 300 },
  ];

  res.send(coffee);
});

app.listen(port, () => {
  console.log(`서버 정상 실행중. ${port}`);
});
