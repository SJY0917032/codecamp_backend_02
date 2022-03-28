import { SignupService } from "./services/signup.service.js";
import { UserService } from "./services/user.service.js";

export class UserController {
  signupUser = async (req, res) => {
    const user = req.body;

    const signupService = new SignupService();

    // 유저를 먼저 검증한다.
    const isValid = signupService.validationUserData(user);

    if (isValid) {
      // 검증 끝난 유저의 핸드폰과 토큰을 검증한다
      const checkPhoneAndToken = await signupService.checkTokenIsTrue(user.phone);

      // 최종적으로 검증이 끝난 유저를 회원가입한다.
      if (checkPhoneAndToken) {
        const result = await signupService.createUser(user);
        // 프론트로 아이디값을 넘긴다.
        res.send(result);
      } else {
        // 실패시 422 에러
        res.status(422).send("에러! 핸드폰 번호가 인증되지 않았습니다.");
      }
    }
  };

  getUser = async (req, res) => {
    const userService = new UserService();
    const Users = await userService.getUsers();
    res.send([...Users]);
  };
}
