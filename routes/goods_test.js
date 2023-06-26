const express = require('express');
const router = express.Router();
//라우터 메서드를 실행해 변수에 담는다 

// localhost:3000/api/ GET
router.get("/", (req, res) => {
    // "/" 추가적인 것이 없는 기본 경로
  res.send("default url for goods.js GET Method");
  // send 안에 값을 반환할거다(res)
});

// localhost:3000/api/about GET
router.get("/about", (req, res) => {
    // "/about"이란 경로가 추가됨
  res.send("goods.js about PATH");
});

module.exports = router;
// router 라는 변수를 밖으로 내보내준다