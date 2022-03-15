import { sendWelcomeTemplate, validationPhone, validationEmail, validationRegiNum } from "./util.js";

const signupUser = ({ email, reginum, phone, site }) => {
  // 1. 유효성 검증
  const isValidtoEmail = validationEmail(email);
  const isValidtoPhone = validationPhone(phone);
  const isValidtoRegi = validationRegiNum(reginum);

  if (isValidtoEmail && isValidtoPhone && isValidtoRegi) {
    // 2. 템플릿전송
    console.log(sendWelcomeTemplate(email, reginum, phone, site));
  }
};

const User = {
  email: "test@test.com",
  reginum: "920324-1038293",
  phone: "01012345678",
  site: "aaa.com",
};

signupUser(User);
