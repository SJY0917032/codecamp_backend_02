import axios from 'axios'


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
  
export async function sendToWelcomeEmail (email, template){
    const X_SECRET_KEY = process.env.EMAIL_X_SECRET_KEY
    const APP_KEY = process.env.EMAIL_APP_KEY
    const SENDER = process.env.EMAIL_SENDER

    // 3. 이메일에 템플릿 전송.
    const RESULT_DATA = await axios.post(// This Endpoint
      `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${APP_KEY}/sender/mail`, 
      {
      // Data(Request Body)
        senderAddress : SENDER,
        title: "안녕하세요 가입을 환영합니다!",
        body: template,
        receiverList: [
            {receiveMailAddr:email, receiveType:"MRT0"},
        ],
      }, 
      {
        // Header
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          // 시크릿키는 깃허브에 올리지 않습니다.
          "X-Secret-Key" : X_SECRET_KEY,
        }
      }
    )
    console.log(RESULT_DATA)
    console.log("이메일을 전송 했습니다.")
}
  
export const getWelcomeTemplate = ({name, age, school}) => {
    // Create createdAt
    let createdAt = new Date();
    createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;
  
    return `
            <html>
                <body>
                    <div style="display: flex; flex-direction: column;">
                        <h1 style="color: aqua">hello ${name}</h1>
                        <hr/>
                        <div>이름 : ${name} </div>
                        <div>나이 : ${age}살 </div>
                        <div>학교 : ${school} </div>
                        <div>가입일 : ${createdAt} </div>
                    </div>
                </body>
            </html>
        `;
  };
  