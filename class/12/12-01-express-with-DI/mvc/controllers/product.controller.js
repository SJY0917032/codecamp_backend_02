// import { CashService } from "./services/cash.service.js";
// import { ProductService } from "./services/product.service.js";

export class ProductController {
  constructor(CashService, ProductService) {
    this.CashService = CashService;
    this.ProductService = ProductService;
  }

  buyProduct = (req, res) => {
    // 1.가진돈을 검증한다.
    const hasMoney = this.CashService.checkValue(); // true or false

    // 2. 판매여부를 검증한다
    const isSoldOut = this.ProductService.checkSoldOut(); // true or false

    if (hasMoney && !isSoldOut) {
      res.send("상품 구매 완료");
    }
  };

  reFundProduct = (req, res) => {
    // 판매여부 검증
    const isSoldOut = this.ProductService.checkSoldOut();

    if (!isSoldOut) {
      res.send("상품 환불 완료");
    }
  };
}
