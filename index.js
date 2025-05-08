// backend/index.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());
app.use(express.json());

// 테스트용 API
app.get("/api/hello", (req, res) => {
  res.json({ message: "백엔드 서버 성공 연결!" });
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
