const express = require('express');

const router = express.Router();

const goods = [
    {
        goodsId: 4,
        name: "상품 4",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
        category: "drink",
        price: 0.1,
    },
    {
        goodsId: 3,
        name: "상품 3",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
        category: "drink",
        price: 2.2,
    },
    {
        goodsId: 2,
        name: "상품 2",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
        category: "drink",
        price: 0.11,
    },
    {
        goodsId: 1,
        name: "상품 1",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
        category: "drink",
        price: 6.2,
    },
];

// 상품 목록 조회 
router.get("/goods", (req, res) => {
    res.json({ "goods": goods });
});

// 상품 상세 조회
router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params;
    // const goodsId = req.params.goodsId;
    const [detail] = goods.filter((goods) => Number(goodsId) === goods.goodsId)
    res.json({ detail });
});

// 장바구니에 상품 추가
const Cart = require("../schemas/cart.js")
router.post("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId })
    if (existsCarts.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다."
        })
    }

    await Cart.create({ goodsId, quantity });
    res.json({ result: "success" })
})

// 장바구니에 상품 수량 수정
router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;

    const existsCarts = await Cart.find({ goodsId })
    if (existsCarts.length) {
        await Cart.updateOne( // 하나를 바꿀건데
            { goodsId: goodsId }, // 어딜 바꿀건데
            { $set: { quantity: quantity } } // 어떻게 바꾸는데
        )
    }
    res.status(200).json({ success: true })
})

// 장바구니에 상품 삭제
router.delete("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;

    const existsCarts = await Cart.find({ goodsId })
    if (existsCarts.length) {
        await Cart.deleteOne({goodsId})
    }
    res.json({ success: "success" })
})

// 상품 저장
const Goods = require("../schemas/goods.js"); // ../ 상위 폴더로 가는 문법
router.post("/goods", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });

    if (goods.length) {
        return res.status(400).json({
            success: false,
            errorMessage: "이미 존재하는 GoodsId입니다."
        });
    }

    const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

    res.json({ goods: createdGoods });
});



module.exports = router;

// 상품 조회 - 상품을 가져와서 보여준다(DB에서 가져오는 것을 안해서 이건 지금 코드 내에 위에 정보만 보임)
//! => DB연결해서 DB에서 가져오게 만들어보기

// 상품 조회 - params와 필터를 이용해 Id로 특정 삼줌 상세보기
//! -> 마찬가지 DB연결 필요

// 상품 저장 - 상품 정보를 body에 입력해 구조분해 할당으로 각 변수에 추가해주고
// -> DB에서 같은 이미 저장된 id인지 찾아서 길이로 확인한다
// -> 없는 상품이면 (길이가0) 받은 정보를 통해서 새로운 데이터를 생성하고
// 그 생성한 정보를 보여준다

// 장바구니에 상품 추가 - 싱픔 저장잉랑 비슷하다 res만 상품 내용이 아니라 success란 문구를 추가해주었다

// 장바구니에 상품 수량 수정 - 이것도 상품 추가와 비슷하지만
// put 메서드로 수량을 수정을 한다
// 이건 장바구니에 상품이 있을 때만 실행된다
// Id로 어떤 객체(데이터)를 바꿀지 찾아서 수량만 바꿔준다
// res.status(200).json({success:true}) -> 실행 여부와 상관없이 true를 보여줌
// 즉, 장바구나에 상품이 없어도 오류가 발생 안됨

//! await가 왜 들어갔는지 이해하기
