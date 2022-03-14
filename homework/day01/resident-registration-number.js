import { checkValidationRegiNum, ChangeNumberToAster } from "./regident-number.js";

const createHiddenNumber = (regiNum) => {
  // 1. 들어온 주민번호에대한 유효성 검증.
  const isValid = checkValidationRegiNum(regiNum);

  // 2. 끝 6자리를 *로 변환하여 출력시킨다.
  if (isValid) {
    console.log(ChangeNumberToAster(regiNum));
  }
};

createHiddenNumber("920324-1038293");
