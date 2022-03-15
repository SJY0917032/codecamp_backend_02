/* 
입력되는 score에 따라 알맞은 등급을 적어야 합니다.
100~90 → "A"
89~80 → "B"
79~70 → "C"
69~60 → "D"
59점 이하는 "F"
100점 초과나 0점 미만은 "잘못된 점수입니다"라는 문구를 띄워주세요.
*/
function grade(score) {
  // switch-case  사용시 범위값을 사용한다면 true를 사용한다.
  switch (true) {
    case score > 100 || score < 0:
      console.log("잘못된 점수입니다");
      break;
    case score >= 90:
      console.log("A");
      break;
    case score >= 80:
      console.log("B");
      break;
    case score >= 70:
      console.log("C");
      break;
    case score >= 60:
      console.log("D");
      break;
    case score <= 59:
      console.log("F");
      break;
  }
}

grade(105); // "잘못된 점수입니다"
grade(-10); // "잘못된 점수입니다"
grade(97); // "A"
grade(86); // "B"
grade(75); // "C"
grade(66); // "D"
grade(52); // "F"
