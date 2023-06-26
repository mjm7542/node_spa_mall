const express = require('express');
const router = express.Router();
//라우터 메서드를 실행해 변수에 담는다 

// /routes/goods.js
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

router.get("/goods", (req, res) => {
    res.status(200).json({ "goods": goods });
});

router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params; 
    // req.params = { goodsId : n } 이걸 구조분해할당 

    // let result = null;
    // for (const good of goods) {
    //     if (Number(goodsId) === good.goodsId) {
    //         result = good;
    //     }
    // }

    const [result] = goods.filter((good)=> Number(goodsId)=== good.goodsId)
    

    res.status(200).json({ detail: result });
});
module.exports = router;

// router 라는 변수를 밖으로 내보내준다