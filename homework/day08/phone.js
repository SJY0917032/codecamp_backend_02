import axios from "axios";
import { Auth } from "./models/auth.model.js"


export function checkValidationPhone(phoneNumber) {
  // 1. 휴대폰번호 유효성 검증
  if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
    console.log("Error!, 번호를 제대로 입력해주세요.");
    return false;
  }
  return true;
}

export function createToken() {
  // 2. 휴대폰 토큰 6자리 만들기.
  const COUNT = 6;
  const token = String(Math.floor(Math.random() * Math.pow(10, COUNT))).padStart(COUNT, "0");
  return token;
}

export async function sendTokenToPhone(phoneNumber, token) {
  const X_SECRET_KEY = process.env.SMS_X_SECRET_KEY
  const APP_KEY = process.env.SMS_APP_KEY
  const SENDER = process.env.SMS_SENDER
  // 3. db에 저장.
  const isAuth = await Auth.exists({ phone : phoneNumber})
  if (!isAuth){
    const auth_token = new Auth(
      {
        token:String(token),
        phone:String(phoneNumber),
        isAuth:false
      }
    )
    await auth_token.save()
    console.log("새로운 핸드폰이 저장됐습니다.")
  } else {
    await Auth.update(
      {phone: phoneNumber},
      {
        $set:{
          token : token,
          isAuth : false
        }
      }
      )
      console.log("기존 핸드폰이 존재해 토큰을 갱신합니다.")
  }
  



  // 4. 휴대폰에 토큰 전송.
  const RESULT_DATA = await axios.post(// This Endpoint
    `https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${APP_KEY}/sender/sms`, 
    {
    // Data(Request Body)
      body: `안녕하세요, 인증번호는 "${token}" 입니다.`,
      sendNo: SENDER,
      recipientList: [{ internationalRecipientNo: phoneNumber, }]
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

  console.log(RESULT_DATA);
  console.log("전송을 완료했습니다.");
  
  // console.log(`${phoneNumber} 번호로 인증번호 ${token} 를 전송합니다.`);
}

export async function checkPhone(phone){
  const isAuth = await Auth.exists({ phone : phone})
  if(isAuth === null){
    return new Promise((reject) => {
      reject(false)
    })
  } else {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
}

export async function checkToken(phone, token){

    const isAuthToken = await Auth.exists({phone:phone, token:token})
    if (isAuthToken === null){
      return new Promise(reject=> {
        reject(false)
      })
    } else {
      await Auth.update(
        {phone: phone},
        {
          $set:{
            isAuth : true
          }
        }
        )
        console.log("인증이 완료됐습니다.")
        return new Promise((resolve) => {
          resolve(true)
        })
    }
  

}