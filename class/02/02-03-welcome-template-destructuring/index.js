const getWelcomeTemplate = ({ myname, myage, myschool }) => {
  // Create createdAt
  let createdAt = new Date();
  createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;

  return `
        <html>
            <body>
                <h1>hello ${myname}</h1>
                <hr/>
                <div>이름 : ${myname} </div>
                <div>나이 : ${myage}살 </div>
                <div>학교 : ${myschool} </div>
                <div>가입일 : ${createdAt} </div>
            </body>
        </html>
    `;
};

const user = {
  myname: "철수",
  myage: 13,
  myschool: "다람초",
};

console.log(getWelcomeTemplate(user));
