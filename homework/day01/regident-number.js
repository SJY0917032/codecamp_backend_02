export const checkValidationRegiNum = (regiNum) => {
  if (regiNum.length !== 14) {
    console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!");
    return false;
  }
  if (regiNum[6] !== "-") {
    console.log("에러발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  }
  return true;
};

export const ChangeNumberToAster = (regiNum) => {
  const temp = regiNum.split("");
  temp.fill("*", 8);
  return temp.join("");
};
