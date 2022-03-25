// 휴대폰번호 유효성검증
export function validationPhone(phoneNumber) {
  if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
    console.log("Error!, 번호를 제대로 입력해주세요.");
    return false;
  }
  return true;
}


// 주민번호 유효성검증
export const validationRegiNum = (regiNum) => {
  let temp = regiNum.split("-");
  const VALIDATEREGINUM =
    /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
  if (regiNum.length !== 14 || temp[0].length !== 6 || temp[1].length !== 7) {
    console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!");
    return false;
  }
  if (regiNum[6] !== "-") {
    console.log("에러발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  }
  if (!VALIDATEREGINUM.test(regiNum)) {
    console.log("에러발생!!! 올바른 주민번호를 입력해주세요.");
    return false;
  }

  return true;
};
