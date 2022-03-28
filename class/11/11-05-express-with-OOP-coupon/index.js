import express from "express";

import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";

const app = express();

// 상품 api
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct); // 상품 구매
app.post("/products/refund", productController.reFundProduct); // 상품 환불

// 상품권 api
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); // 상품권 구매

app.listen(3000);
