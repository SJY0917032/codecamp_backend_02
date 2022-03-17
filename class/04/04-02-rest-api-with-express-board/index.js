const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
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
  req.res // 2. 저장 데이터 결과 res에담아 전해주기
    .send("등록됨!~!등록됨!~!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
