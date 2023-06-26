const express = require('express');
// "express" 라이브러리를 가져와서 변수 express에 담는다
const app = express();
// express를 실행해서 app객체를 만듬
const port = 3000;
const goodsRouter = require("./routes/goods_test2.js");
// require 필요하다
//  ./ 현재 폴더를 가리킨다
// 현재 폴더에 routes/goods.js를 가져온다

app.get('/', (req, res) => {
    // get 메서드를 통해서 api를 실행시킬 수 있다
  res.send('Hello World!');
});

// localhost:3000/api -> goodsRouter
app.use("/api", [goodsRouter]);
// 미들웨어로 라우터를 등록했다
// api라는 경로를 추가해서 라우터로 갈 수 있었다


app.listen(port, () => {
  // listen 메서드로 서버를 실행 > port(3000)으로 접근했을 때 
  console.log(port, '포트로 서버가 열렸어요!');
  // 성공 메세지
});
