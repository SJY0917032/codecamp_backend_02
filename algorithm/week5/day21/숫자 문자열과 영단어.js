/*
네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.
다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.
1478 → "one4seveneight"
234567 → "23four5six7"
10203 → "1zerotwozero3"
이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

*/

function solution(s) {
  let answer = 0;
  // 정규식으로 숫자들을 치환할 계획..
//   let reg = [
//     /zero/i,
//     /one/i,
//     /two/i,
//     /three/i,
//     /four/i,
//     /five/i,
//     /six/i,
//     /seven/i,
//     /eight/i,
//     /nine/i,
//   ];
  // ㅋㅋ 
  // 숫자 첫단어를 찾아서 숫자로 바꿔준다
  // t같은경우에는 w,h가 다음 영단어이므로 이런식으로
  // 다음꺼를 찾아서 해당하는 숫자로 바꿔준다
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === "z") {
//       s = s.replace(reg[0], "0");
//     }
//     if (s[i] === "o") {
//       s = s.replace(reg[1], "1");
//     }
//     if (s[i] === "t") {
//       if (s[i + 1] === "w") {
//         s = s.replace(reg[2], "2");
//       } else {
//         s = s.replace(reg[3], "3");
//       }
//     }
//     if (s[i] === "f") {
//       if (s[i + 1] === "o") {
//         s = s.replace(reg[4], "4");
//       } else {
//         s = s.replace(reg[5], "5");
//       }
//     }
//     if (s[i] === "s") {
//       if (s[i + 1] === "i") {
//         s = s.replace(reg[6], "6");
//       } else {
//         s = s.replace(reg[7], "7");
//       }
//     }
//     if (s[i] === "e") {
//       s = s.replace(reg[8], "8");
//     }
//     if (s[i] === "n") {
//       s = s.replace(reg[9], "9");
//     }
//   }



  // 다른사람의풀이를 보니까 정규식을 이용해서 replace를 하면되는거였다
  // 굳이 for를 돌릴필요가..
  let reg = [/zero/gi, /one/gi, /two/gi, /three/gi, /four/gi, /five/gi, /six/gi, /seven/gi, /eight/gi, /nine/gi ]

  s = s.replace(reg[0], '0')
  .replace(reg[1],'1')
  .replace(reg[2],'2')
  .replace(reg[3],'3')
  .replace(reg[4],'4')
  .replace(reg[5],'5')
  .replace(reg[6],'6')
  .replace(reg[7],'7')
  .replace(reg[8],'8')
  .replace(reg[9],'9')

  // 이런식으로 정규식에는 g 키워드가 있어서 해당하는 단어를 전역으로 바꿀수있다.
  

  answer = Number(s);
  return answer;
}
