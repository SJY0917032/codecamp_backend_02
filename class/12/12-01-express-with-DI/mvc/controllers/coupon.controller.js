// import { CashService } from "./services/cash.service.js";

export class CouponController {
  constructor(cashService) {
    this.cashService = cashService;
  }
  buyCoupon = (req, res) => {
    // 1.가진돈을 검증한다.
    const hasMoney = this.cashService.checkValue(); // true or false

    // 2. 상품권을 구매한다.
    if (hasMoney) {
      res.send("상품권을 구매하셧습니다~!");
    }
  };
}
