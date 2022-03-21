// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'

  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;

  const PHONE_NUMBER = `${phone1+phone2+phone3}`

  console.log(PHONE_NUMBER)

  await axios.post("http://127.0.0.1:3000/tokens/phone", {
    phone : PHONE_NUMBER
  })

  console.log('인증 번호 전송')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const phone1 = document.getElementById("PhoneNumber01").value;
  const phone2 = document.getElementById("PhoneNumber02").value;
  const phone3 = document.getElementById("PhoneNumber03").value;

  const PHONE_NUMBER = `${phone1+phone2+phone3}`


  const REGINUM = `${document.getElementById("SignupPersonal").value}-${document.getElementById("SignupPersonal2").value}`

  const user = {
    name: document.getElementById("SignupName").value,
    regi: REGINUM,
    phone: PHONE_NUMBER,
    email: document.getElementById("SignupEmail").value,
    password: document.getElementById("SignupPwd").value,
    prefer: document.getElementById("SignupPrefer").value
  };

  await axios.post("http://127.0.0.1:3000/Users", {
    user : user
  })
  

  console.log('회원 가입 이메일 전송')
}
