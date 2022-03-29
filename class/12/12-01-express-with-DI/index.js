import express from "express";

import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/product.service.js";

const app = express();

const productService = new ProductService(); // 한번만 사용해 모든곳에서 재사용(싱글톤)
const cashService = new CashService(); // 한번만 사용해 모든곳에서 재사용(싱글톤)
const pointService = new PointService(); // 한번만 사용해 모든곳에서 재사용(싱글톤)

// 상품 api
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매
app.post("/products/refund", productController.reFundProduct); // 상품 환불

// 상품권 api
const couponController = new CouponController(cashService);
app.post("/coupons/buy", couponController.buyCoupon); // 상품권 구매

app.listen(3000);
