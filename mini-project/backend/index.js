/**
 *
 * 회원가입 API (POST)
 * 회원 목록 조회 API (GET)
 * 토큰 인증 요청 API (POST)
 * 인증 완료 API (PATCH)
 * 스타벅스 커피 목록 조회 API (GET)
 *
 */

import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// custom
import { createUser, validationUserData, checkTokenIsTrue } from "./signup.js";
// 핸드폰 인증관련
import { checkPhone, createToken, checkToken,sendTokenToPhone } from "./phone.js";

// 유틸 
import { validationPhone } from "./utils.js"

// 환경변수
dotenv.config();

const app = express();
const port = 3000;

//  cors
app.use(cors());
app.use(express.json());

// 회원가입
app.post("/user", async (req, res) => {
  const user = req.body;
  // 유저검증
  const isValid = validationUserData(user);
  // 검증끝난 유저 핸드폰 검증
  if (isValid) {
    const checkPhoneAndToken = await checkTokenIsTrue(user.phone)
    console.log(checkPhoneAndToken);
    if (checkPhoneAndToken) {
      // 회원가입시키기
      const result = await createUser(user);
      console.log(result);
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
  checkPhone(phone)
    .then(() => {
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

mongoose.connect("mongodb://my-database:27017/camp");

app.listen(port, () => {
  console.log("========================");
  console.log(`서버 정상 실행중. ${port}`);
  console.log("========================");
});
