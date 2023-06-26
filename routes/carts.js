const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// 장바구니에 상품 조회
router.get("/carts", async (req, res) => {
    const carts = await Cart.find({}); // 이건 mongoose에서 가져온 find
    // [
    //   {goodsId,quantity}
    // ]
    const goodsIds = carts.map((cart) => {
        return cart.goodsId;
        // goodsId만 가져온다
        // 예)[2, 10, 11]
    })
    const goods = await Goods.find({ goodsId: goodsIds }) // 이건 mongoose에서 가져온 find
    // goodsId: goodsIds 일 떄의 결과값만 가져온다 => 에시에서 Id가 2, 10, 11 값만

    const results = carts.map((cart) => {
        return {
            "quantity": cart.quantity, //! 이건 왜 그냥 가져오지? = > 이건 장바구니에 들어있는 갯수 
            "goods": goods.find((item) => item.goodsId === cart.goodsId), // Array의 메서드 find
            // 각 요소만큼 반복을 하면서 조건에 맞는 첫 번째 값만 저장된다
        }
    })
    res.json({
        "carts": results,
    })
})

module.exports = router

// 라우터 기능을 사용하기 위해 가져오고 
// 스키마(형식) - 카트와 굿즈를 가져온다

// 카트에는 Id만 있어서 이를 통해 정보를 따로 가져와야한다.
// 결국 앞에 과정들은 모두 Id만 가지고 상세 정보를 가져오기 위함이다.

// 1. carts(1.)에 장바구니 안에(schemas/cart.js의) 모든 데이터를 찾아 담는다
// 2. goodsIds(2.)에 goodsId값만 담는다 => 여러 Id가 들어있음
// 3. goods(3.)에 goodsId: goodsIds(2.)인 경우의 값만을 찾아서 담는다 => 마찬가지로 여러 상품 정보가 들어있음

// 4. results(4.)에 carts(1.)의 값을 map로 반복하면서 다시 find로 필요한 값만 담아서 => 반복의 반복
// cart의 각 요소를 돌면서 Id을 goods(3.)의 안에 각각의 정보들 중 Id부분을 사용해 맞는 값을 찾는다 => 필요한 상품의 정보
// 즉, goods안에 여러 상품 정보들 중에서 필요한 정보만 골라서 찾는다 => quantity와 상품 상세 정보가 맞게 짝지어짐

//=> 이렇게 id값만을 가지고 상세 정보를 가져온다

// 5. res.json으로 results(4.)를 보여준다 