import axios from "axios";
import { Token } from "./models/token.model.js";

// 토큰 생성
export function createToken() {
  const COUNT = 6;
  const token = String(Math.floor(Math.random() * Math.pow(10, COUNT))).padStart(COUNT, "0");
  return token;
}

// 생성된 토큰을사용, 토큰을 db에저장하며 들어온 핸드폰에 전송한다
export async function sendTokenToPhone(phone, token) {
  const X_SECRET_KEY = process.env.SMS_X_SECRET_KEY;
  const APP_KEY = process.env.SMS_APP_KEY;
  const SENDER = process.env.SMS_SENDER;

  // 토큰이 존재하는지 체크.
  const validationToken = await Token.exists({ phone: phone });

  // 토큰이 존재하지 않으면 디비에 저장한다.
  if (!validationToken) {
    const createdToken = await new Token({
      token: String(token),
      phone: String(phone),
      isAuth: false,
    });
    await createdToken.save();
    console.log(`새로운 핸드폰 ${phone} 이 저장됐습니다.`);
  } else {
    // 존재하면 토큰정보를 갱신시켜준다
    await Token.updateOne(
      { phone: phone },
      {
        $set: {
          token: token,
          isAuth: false,
        },
      }
    );
    console.log(`기존 핸드폰 ${phone}이 존재해 토큰을 갱신합니다.`);
  }

  //   생성한토큰을 들어온 핸드폰 번호로 전송한다.
  const tokenData = await axios.post(
    // This Endpoint
    `https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${APP_KEY}/sender/sms`,
    {
      // Data(Request Body)
      body: `안녕하세요, 인증번호는 "${token}" 입니다.`,
      sendNo: SENDER,
      recipientList: [{ internationalRecipientNo: phone }],
    },
    {
      // Header
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        // 시크릿키는 깃허브에 올리지 않습니다.
        "X-Secret-Key": X_SECRET_KEY,
      },
    }
  );

  console.log(`send To Phone : ${phone} : ${token}`);
}

export async function checkPhone(phone) {
  const validationTokenToPhone = await Token.exists({ phone: phone });
  if (validationTokenToPhone === null) {
    return new Promise((reject) => {
      reject(false);
    });
  } else {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}

export async function checkToken(phone, token) {
  const validationToken = await Token.exists({ phone: phone, token: token });
  if (validationToken === null) {
    return new Promise((reject) => {
      reject(false);
    });
  } else {
    await Token.update(
      { phone: phone },
      {
        $set: {
          isAuth: true,
        },
      }
    );
    console.log("인증이 완료됐습니다.");
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
