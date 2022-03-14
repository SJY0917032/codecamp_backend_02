//  module
import { checkValidationPhone, createToken, sendTokenToPhone } from "./phone.js";

// common js
// const { ...} = require(...)

console.log("BE 02 Day01 03-14");

function createTokenOfPhone(phoneNumber) {
  // 1. 휴대폰번호 유효성 검증
  const isValid = checkValidationPhone(phoneNumber);
  if (isValid) {
    // 2. 휴대폰 토큰 6자리 만들기.
    const token = createToken();
    // 3. 휴대폰에 토큰 전송.
    sendTokenToPhone(phoneNumber, token);
  }
}

createTokenOfPhone("01012345678");
