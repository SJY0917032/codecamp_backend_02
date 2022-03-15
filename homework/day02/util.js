export const sendWelcomeTemplate = (email, reginum, phone, site) => {
  let createdAt = createDate();
  return `
            <html>
                <body>
                    <h1>hello ${email}</h1>
                    <hr/>
                    <div>이메일 : ${email} </div>
                    <div>주민번호 : ${reginum} </div>
                    <div>핸드폰 : ${phone} </div>
                    <div>좋아하는 사이트 : ${site} </div>
                    <div>가입일 : ${createdAt} </div>
                </body>
            </html>
        `;
};

const createDate = () => {
  let createdAt = new Date();
  return (createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`);
};

export function validationPhone(phone) {
  // 1. 휴대폰번호 유효성 검증
  if (phone.length !== 10 && phone.length !== 11) {
    console.log("Error!, 번호를 제대로 입력해주세요.");
    return false;
  }
  return true;
}

export const validationRegiNum = (regiNum) => {
  let temp = regiNum.split("-");
  const VALIDATEREGINUM = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
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

export const validationEmail = (email) => {
  if (email == "") {
    console.log("이메일이 존재하지 않습니다.");
    return false;
  }
  const EMAIL_REG = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (EMAIL_REG.test(email)) {
    return true;
  } else {
    console.log("이메일에 형태가 올바르지 않습니다.");
    return false;
  }
};
