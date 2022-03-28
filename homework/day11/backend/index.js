import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// 스웨거
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// 커스텀 라이브러리
// 회원가입 관련
import { UserController } from "./controllers/user.controller.js";
// 토큰 관련
import { TokenController } from "./controllers/token.controller.js";

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

// 회원 api Controller
const userController = new UserController();
// 토큰 api Controller
const tokenController = new TokenController();

// 회원 가져옴
app.get("/users", userController.getUser);

// 회원가입
app.post("/user", userController.signupUser);

// 토큰인증생성
app.post("/tokens/phone", tokenController.sendToken);

// 토큰인증
app.patch("/tokens/phone", tokenController.authToken);

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
