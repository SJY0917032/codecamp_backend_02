// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = p1 + p2 + p3;
  axios
    .post("http://localhost:3000/tokens/phone", { phone: phoneNumber })
    .then((req, res) => {
      console.log(req);
    })
    .catch((err) => console.log(err));
  console.log("인증 번호 전송");
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = p1 + p2 + p3;
  const token = document.getElementById("TokenInput").value;
  axios
    .patch("http://localhost:3000/tokens/phone", { phone: phoneNumber, token: token })
    .then((req, res) => {
      document.querySelector("#ValidationInputWrapper").style.display = "none";
    })
    .catch((err) => console.log(err));
  alert("핸드폰 인증 완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phoneNumber = p1 + p2 + p3;
  const name = document.getElementById("SignupName").value;
  const email = document.getElementById("SignupEmail").value;
  const personal = document.getElementById("SignupPersonal1").value + document.getElementById("SignupPersonal2").value;
  const prefer = document.getElementById("SignupPrefer").value;
  const pwd = document.getElementById("SignupPwd").value;

  axios
    .post("http://localhost:3000/user", {
      name: name,
      email: email,
      personal: personal,
      prefer: prefer,
      pwd: pwd,
      phone: phoneNumber,
    })
    .then((req, res) => {
      alert(req.data);
    })
    .catch((err) => alert(err));
  alert("회원 가입 완료");
};
