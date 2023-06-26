const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number, // 타입은 무엇인가
    required: true, // 이 값이 있어야하는가
    unique: true // 고유한 값인가
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  }
});

module.exports = mongoose.model("Goods", goodsSchema);
// 몽구스.모델을 통해서 "Defaults"란 이름으로 defaultSchema을 통해 틀을 제시하겠다