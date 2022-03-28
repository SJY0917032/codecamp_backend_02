import { TokenService } from "./services/token.service.js";
import { UtilService } from "./services/util.service.js";

export class TokenController {
  sendToken = async (req, res) => {
    const utilService = new UtilService();
    const tokenService = new TokenService();

    const phone = req.body.phone;

    // 1. 핸드폰 유효성 검사
    const validationToPhone = utilService.validationPhone(phone);

    // 2. 토큰 생성 및 전송
    if (validationToPhone) {
      const token = tokenService.createToken();
      // 3. 생성한 토큰 전송
      await tokenService.sendTokenToPhone(phone, token);
    }
    res.send("토큰이 생성됐습니다.");
  };

  authToken = (req, res) => {
    const phone = req.body.phone;
    const token = req.body.token;

    const tokenService = new TokenService();

    // 인증한 데이터를 검증한다
    // 인증한 데이터(핸드폰)이 존재하는지 먼저 검증한다.
    tokenService
      .checkPhone(phone)
      .then(() => {
        tokenService
          .checkToken(phone, token)
          .then((data) => {
            res.send(data);
          })
          .catch((data) => {
            res.send(data);
          });
      })
      .catch((data) => {
        res.send(data);
      });
  };
}
