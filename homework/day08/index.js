/**
 * 회원 목록을 조회하는 API
 */
import cors from "cors";
import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { checkValidationPhone, createToken, sendTokenToPhone, checkToken, checkPhone } from "./phone.js";

dotenv.config() // env를 읽는다.

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



app.post("/tokens/phone",  async (req, res) => {
  const PHONE_NUMBER = req.body.phone;
  // 1. 받은 번호 유효성 검증
  const VALIDATION_TO_PHONE = await checkValidationPhone(PHONE_NUMBER)

  if (VALIDATION_TO_PHONE){
    // 2. 휴대폰 토큰 생성
    const TOKEN = await createToken();
    // 3. 생성한 토큰을 휴대폰에 전송한다.
    await sendTokenToPhone(PHONE_NUMBER, TOKEN);
  }

  res.send("토큰 생성 완료")
})

app.patch("/tokens/phone", (req, res) => {
  const PHONE_NUMBER = req.body.phone;
  const TOKEN = req.body.token;

  checkPhone(PHONE_NUMBER).then(() => {
    checkToken(PHONE_NUMBER, TOKEN).then(data => {
      res.send(data)
    }).catch(data => {
      res.send(data)
    })
  }).catch(data => {
    res.send(data)
  })
})



mongoose.connect("mongodb://my-database:27017/camp")

app.listen(port, () => {
  console.log(`서버 정상 실행중. ${port}`);
});

