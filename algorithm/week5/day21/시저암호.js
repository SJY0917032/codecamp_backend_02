/*
어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다. 
예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다. 
"z"는 1만큼 밀면 "a"가 됩니다. 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.
*/
function solution(s, n) {
  // var answer = "";
  // // 들어온 문자열을 공백과 문자로 나눈다.
  // s = s.split("");
  // // 순회
  // for (i = 0; i < s.length; i++) {
  //   // 공백판별
  //   if (s[i] !== " ") {
  //       // s[i]를 ascii코드로 바꾼걸 임시로 할당한다.
  //     temp = s[i].charCodeAt();
  //     // 소문자판별
  //     if ("a" <= s[i] && "z" >= s[i]) {
  //         // s[i] + n이 'z'을 넘어간경우 'a'로 밀어서 계산하기 위한 수식
  //       if (temp + n > 122) {
  //         s[i] = String.fromCharCode(96 + (temp + n - 122));
  //       } else {
  //         s[i] = String.fromCharCode(temp + n);
  //       }
  //     }
  //     // 대문자판별
  //     else {
  //         // 소문자와 동일하다.
  //       if (temp + n > 90) {
  //         s[i] = String.fromCharCode(64 + (temp + n - 90));
  //       } else {
  //         s[i] = String.fromCharCode(temp + n);
  //       }
  //     }
  //   }
  // }
  // // n만큼 밀어낸 s[i]를 공백문자들과 합친다.
  // answer = s.join("");
  // return answer;

  // 리팩터링
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = lower.toUpperCase();

  const answer = s.split("").reduce((acc, cur) => {
    const word = lower.includes(cur) ? lower : upper;
    let idx = word.indexOf(cur) + n;

    if (idx >= 26) {
      idx -= 26; // word의 범위를 벗어난것(다시 26을빼준값을 넣어준다)
    }

    return acc + (cur === " " ? " " : word[idx]);
  }, "");

  return answer;

  // reduce에는 문자열또한 포함될수있다
  // return 값으로 공백이면 그냥 공백을 넘겨주고, 아니면 idx만큼 밀어준값을 return 시켜준다
}
