import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv'
import { options } from "./swagger/config.js";
import { checkValidationPhone, createToken, sendTokenToPhone } from "./phone.js";
import { validationEmail, sendToWelcomeEmail,getWelcomeTemplate } from "./email.js";

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

app.get("/boards", (req, res) => {
  // 데이터 조회 => db connect && data pull
  const result = [
    { number: 1, writer: "철수", title: "this title!", content: "this content?!" },
    { number: 2, writer: "철철", title: "this this!", content: "content content?!" },
    { number: 3, writer: "수수", title: "title title!", content: "this this?!" },
  ];

  // 데이터를 res에담아 전해주기
  res.send(result);
});

app.post("/boards", (req, res) => {
  console.log(req.body);
  // 1. 데이터 등록 -> db connect && data write
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



app.listen(port, () => {
  console.log(`${port}번 포트 에서 서버가 정상 구동중입니다.`);
});


