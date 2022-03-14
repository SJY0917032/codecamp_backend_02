console.log("BE 02 Day01 03-14");

createTokenOfPhone = (phoneNumber) => {
  // 1. 휴대폰번호 유효성 검증
  if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
    console.log("Error!, 번호를 제대로 입력해주세요.");
    return;
  }

  // 2. 휴대폰 토큰 6자리 만들기.
  const COUNT = 6;
  const result = String(Math.floor(Math.random() * Math.pow(10, COUNT))).padStart(COUNT, "0");

  // 3. 휴대폰에 토큰 전송.
  console.log(`${phoneNumber} 번호로 인증번호 ${result} 를 전송합니다.`);
};

createTokenOfPhone("01012345678");
