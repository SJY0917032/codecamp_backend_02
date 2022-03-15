export const getWelcomeTemplate = (name, age, school, email, password) => {
  // Create createdAt
  let createdAt = new Date();
  createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;

  return `
          <html>
              <body>
                  <h1>hello ${name}</h1>
                  <hr/>
                  <div>이름 : ${name} </div>
                  <div>나이 : ${age}살 </div>
                  <div>학교 : ${school} </div>
                  <div>이메일 : ${email} </div>
                  <div>비밀번호 : ${password} </div>
                  <div>가입일 : ${createdAt} </div>
              </body>
          </html>
      `;
};
