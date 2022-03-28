import cheerio from "cheerio";
import axios from "axios";

import { UtilService } from "./util.service.js";

// 모델 임포트
import { Token } from "../../models/token.model.js";
import { User } from "../../models/user.model.js";

export class SignupService {
  // 유저에서 넘긴 좋아하는 사이트를 기준으로 오픈그래프 객체를 만든다.
  getOpenGraph = async (data) => {
    let reg = /(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    let fav = [];
    const targetURL = data.replace(reg, (e) => fav.push(e));
    const url = await axios.get(fav[0]);
    const $ = cheerio.load(url.data);

    const obj = {};
    $("meta").each((_, el) => {
      if ($(el).attr("property")) {
        const KEY = $(el).attr("property").split(":")[1];
        const VALUE = $(el).attr("content");
        if (KEY !== "url") {
          obj[KEY] = VALUE;
        }
      }
    });
    return obj;
  };

  // 유저가 넘긴 데이터를 검증한다.
  validationUserData = (data) => {
    const utilService = new UtilService();
    const validPersonal = utilService.validationPersonal(data.personal);
    const validPhone = utilService.validationPhone(data.phone);
    const validEmail = utilService.validationEmail(data.email);

    if (validPersonal && validPhone && validEmail) {
      return true;
    } else {
      return false;
    }
  };

  // 유저가 넘긴 주민번호의 뒷자리를 마스킹해준다.
  changeNumberToAster = (personal) => {
    const temp = personal.split("");
    temp.fill("*", 8);
    return temp.join("");
  };

  // 유저가 넘긴 핸드폰을 검증하고 검증된 핸드폰의 Token상태를 체크한다
  checkTokenIsTrue = async (phone) => {
    const token = await Token.findOne({ phone: phone });
    if (token) {
      return token.isAuth;
    } else {
      return false;
    }
  };

  // 회원기입 템플릿을 만든다
  getWelcomeTemplate = (name, phone, prefer) => {
    // Create createdAt
    let createdAt = new Date();
    createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;
    return `
            <html>
                <body>
                    <div>
                        <h1 style="color: aqua">${name}님 가입을 환영합니다!</h1>
                        <hr/>
                        <div>이름 : ${name} </div>
                        <div>전화번호 : ${phone} </div>
                        <div>좋아하는사이트 : ${prefer} </div>
                        <div>가입일 : ${createdAt} </div>
                    </div>
                </body>
            </html>
        `;
  };

  // 회원가입 이메일을 전송한다
  sendToWelcomeEmail = async (email, template) => {
    const X_SECRET_KEY = process.env.EMAIL_X_SECRET_KEY;
    const APP_KEY = process.env.EMAIL_APP_KEY;
    const SENDER = process.env.EMAIL_SENDER;
    const RESULT_DATA = await axios.post(
      // This Endpoint
      `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${APP_KEY}/sender/mail`,
      {
        // Data(Request Body)
        senderAddress: SENDER,
        title: "안녕하세요 가입을 환영합니다!",
        body: template,
        receiverList: [{ receiveMailAddr: email, receiveType: "MRT0" }],
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
    console.log("이메일을 전송 했습니다.");
  };

  // 받은 데이터로 해당하는 유저를 생성합니다.

  createUser = async (data) => {
    const name = data.name;
    const email = data.email;
    const personal = await this.changeNumberToAster(data.personal);
    const prefer = data.prefer;
    const pwd = data.pwd;
    const phone = data.phone;
    const og = await this.getOpenGraph(prefer);
    let id = "";

    const user = await new User({
      name: name,
      email: email,
      personal: personal,
      prefer: prefer,
      pwd: pwd,
      phone: phone,
      og: og,
    });

    await user
      .save()
      .then((savedData) => {
        id = savedData._id.toString();
        const sname = savedData.name;
        const sphone = savedData.phone;
        const sprefer = savedData.prefer;
        const semail = savedData.email;
        const template = this.getWelcomeTemplate(sname, sphone, sprefer);
        this.sendToWelcomeEmail(semail, template);
      })
      .catch((err) => {
        return err;
      });
    console.log(`새로운 유저 ${name}이 생성됐습니다! `);
    return id;
  };
}
