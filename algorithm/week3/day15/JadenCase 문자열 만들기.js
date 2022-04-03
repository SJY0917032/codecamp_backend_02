/**
 * JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다.
 * 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
 * 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.
 *
 */
function solution(s) {
  // let answer = "";

  // // 문자열의 첫글자를 대문자로 바꾸는 함수
  // function upper(s) {
  //   return s.charAt(0).toUpperCase() + s.slice(1);
  // }

  // // 들어온 단어를 공백기준으로 나눠준다
  // s = s.split(" ");
  // for (i = 0; i < s.length; i++) {
  //   // 근데 공백이 2번이상 들어간 경우도있다
  //   // 공백은 toLowerCase나 toUpperCase를 들어가면 Syntax에러를 만들기 때문에
  //   // 조건문을 걸어준다.
  //   if (s[i] !== " ") {
  //     s[i] = s[i].toLowerCase();
  //     s[i] = upper(s[i]);
  //   }
  // }

  // // 합쳐준다
  // s = s.join(" ");

  // return (answer = s);

  // 리팩터링

  s = s
    .toLowerCase()
    .split(" ")
    .map((str) => {
      return str !== "" ? str[0].toUpperCase() + str.slice(1) : str;
    })
    .join(" ");

  return s;
}
