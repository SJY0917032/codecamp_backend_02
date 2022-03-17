export function checkValidationPhone(phoneNumber) {
  // 1. 휴대폰번호 유효성 검증
  if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
    console.log("Error!, 번호를 제대로 입력해주세요.");
    return false;
  }
  return true;
}

export function createToken() {
  // 2. 휴대폰 토큰 6자리 만들기.
  const COUNT = 6;
  const token = String(Math.floor(Math.random() * Math.pow(10, COUNT))).padStart(COUNT, "0");
  return token;
}

export function sendTokenToPhone(phoneNumber, token) {
  // 3. 휴대폰에 토큰 전송.
  console.log(`${phoneNumber} 번호로 인증번호 ${token} 를 전송합니다.`);
}
