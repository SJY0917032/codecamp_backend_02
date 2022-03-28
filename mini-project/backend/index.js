import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// 스웨거
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// 커스텀 라이브러리
// 회원가입 관련
import { createUser, validationUserData, checkTokenIsTrue } from "./signup.js";
// 핸드폰 인증관련
import { checkPhone, createToken, checkToken, sendTokenToPhone } from "./phone.js";
// 유틸
import { validationPhone } from "./utils.js";
// 회원
import { getUsers } from "./users.js";
// 커피
import { getCoffee } from "./coffee.js";

// swagger config
import { options } from "./swagger/config.js";

// 환경변수
dotenv.config();

const app = express();
const port = 3000;

//  cors
app.use(cors());

// json설정
app.use(express.json());

// swagger 설정
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 회원가입
app.post("/user", async (req, res) => {
  const user = req.body;
  // 유저검증
  const isValid = validationUserData(user);
  if (isValid) {
    // 검증끝난 유저 핸드폰 검증
    const checkPhoneAndToken = await checkTokenIsTrue(user.phone);
    if (checkPhoneAndToken) {
      // 회원가입시키기
      const result = await createUser(user);
      // 프론트에 데이터넘기기
      res.send(result);
    } else {
      res.status(422).send("에러! 핸드폰 번호가 인증되지 않았습니다.");
    }
  }
});

// 토큰인증생성
app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  // 1. 유효성검증
  const validationToPhone = await validationPhone(phone);

  // 2. 토큰생성 및 전송
  if (validationToPhone) {
    const token = createToken();
    //  3. 생성한 토큰 전송
    await sendTokenToPhone(phone, token);
  }
  res.send("토큰이 생성됐습니다.");
});

// 토큰인증
app.patch("/tokens/phone", (req, res) => {
  const phone = req.body.phone;
  const token = req.body.token;

  //  인증한 데이터를 검증한다.
  // 인증한 데이터 - 폰이 존재하는지 먼저 검증한다.
  checkPhone(phone)
    .then(() => {
      // 핸드폰이 존재한다면 토큰의 상태를체크한다.
      checkToken(phone, token)
        .then((data) => {
          res.send(data);
        })
        .catch((data) => {
          res.send(data);
        });
    })
    .catch((data) => {
      res.send(data);
    });
});

// 회원 가져옴
app.get("/users", async (req, res) => {
  const Users = await getUsers();
  res.send([...Users]);
});

// 커피들 가져옴
app.get("/starbucks", async (req, res) => {
  const Coffee = await getCoffee();
  res.send([...Coffee]);
});

mongoose.connect("mongodb://my-database:27017/camp");

app.listen(port, () => {
  console.log("===============================");
  console.log(`${port}번 포트 에서 서버 정상 실행중.`);
  console.log("===============================");
});
