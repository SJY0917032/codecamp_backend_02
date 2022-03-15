export const validationEmail = (email) => {
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

export const sendToWelcomeEmail = (email, template) => {
  console.log(`${email}로. ${template}를 전송합니다.`);
};
