export class UtilService {
  validationPhone = (phoneNumber) => {
    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
      console.log("Error!, 번호를 제대로 입력해주세요.");
      return false;
    }
    return true;
  };

  validationPersonal = (personal) => {
    const validPersonal = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))[1-4][0-9]{6}$/;
    if (!validPersonal.test(personal)) {
      console.log("에러발생!!! 올바른 주민번호를 입력해주세요.");
      return false;
    }

    return true;
  };

  validationEmail = (email) => {
    if (email == "") {
      console.log("이메일이 존재하지 않습니다.");
      return false;
    }

    if (email.includes("@")) {
      return true;
    } else {
      console.log("이메일에 @가 포함되지 않았습니다.");
      return false;
    }
  };
}
