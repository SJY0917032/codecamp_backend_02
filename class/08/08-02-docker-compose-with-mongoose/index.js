import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { options } from "./swagger/config.js";
import { checkValidationPhone, createToken, sendTokenToPhone } from "./phone.js";
import { validationEmail, sendToWelcomeEmail,getWelcomeTemplate } from "./email.js";
import { Board } from "./models/board.model.js";


dotenv.config() // env를 읽는다.

const app = express();
const openapiSpecification = swaggerJsdoc(options);
const port = 3001;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

app.get("/boards", async (req, res) => {
  // 데이터 조회 => db connect && data pull
  // 조건쿼리 작성법 (철수만 불러라.)
  // const result = Board.find({ writer : "철수" })
  const result = await Board.find()
  // 데이터를 res에담아 전해주기
  res.send(result);
});

app.post("/boards", async (req, res) => {
  console.log(req.body);
  // 1. 데이터 등록 -> db connect && data write
  const board1 = new Board(
    {
      // writer:req.body.writer, title:req.body.title, contents:req.body.contents
      ...req.body
    })
  await board1.save()
  res.send("등록됨!~!등록됨!~!");
});

app.post("/tokens/phone", (req, res) => {
  let phoneNumber = req.body.phone;
  //   1. 휴대폰번호 유효성 검증
  const isValid = checkValidationPhone(phoneNumber);
  if (isValid) {
    // 2. 휴대폰 토큰 6자리 만들기.
    const token = createToken();
    // 3. 휴대폰에 토큰 전송.
    sendTokenToPhone(phoneNumber, token);
  }

  res.send("인증 완료!");
});

app.post("/Users", (req, res) => {
  const USER = req.body.user;
  const isValid = validationEmail(USER.email)
  if (isValid) {
    // 2. Welcome Template
    const template = getWelcomeTemplate(USER);
    // 3. send To Welcome email
    sendToWelcomeEmail(USER.email, template);
  }

  res.send("유저 생성 완료.")
})

// 몽고디비 접속.
// docker-compose를 통해서 이름을 묶는다면
// 접속할때 네임 리졸루션으로 my-database이런식으로 접근이 가능하다.
mongoose.connect("mongodb://my-database:27017/camp")


app.listen(port, () => {
  console.log(`${port}번 포트 에서 서버가 정상 구동중입니다.`);
});


