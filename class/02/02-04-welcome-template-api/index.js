import { validationEmail, sendToWelcomeEmail } from "./email.js";
import { getWelcomeTemplate } from "./welcome_template.js";

const createUser = ({ name, age, school, email, password }) => {
  // 1. validation Email (1.존재여부. , 2. "@"가 존재해야함.)
  const isValid = validationEmail(email);
  if (isValid) {
    // 2. Welcome Template
    let template = getWelcomeTemplate(name, age, school, email, password);
    // 3. send To Welcome email
    sendToWelcomeEmail(email, template);
  }
};

const myuser = {
  name: "철수",
  age: 8,
  school: "다람초",
  email: "a@a.com",
  password: "1234",
};

createUser(myuser);
