function solution(s) {
  // 4.26일 수정
  if (s[0] === ")" && s[s.length - 1] === "(") {
    return false;
  }
  // ( 가 열린 횟수를 추가한다
  let c = 0;
  // s만큼 돈다
  for (let i = 0; i < s.length; i++) {
    // 괄호가 열렷으면 추가시켜줌
    if (s[i] === "(") {
      c++;
    } else {
      c--;
      // 아니면 닫힌거니 열린횟수에서 차감시켜준다
    }
    // 반복문을 도는도중에 c가 -1이 되는순간
    // 괄호가 이상한상태니 false를 반환시킴
    if (c < 0) {
      return false;
    }
  }

  // 반복문이 종료된뒤에 남은괄호가 1이상이면 false
  // 완전히 닫히면 true
  return c > 0 ? false : true;
}

// 리팩터링 ( 리듀스 활용 )
// function solution(s) {
//   if(s[0] === ")" || s[s.length-1] === "("){
//       return false;
//   }
//     // reduce도는중 0보다 작아지는걸 체크하는 FLAG
//    let fail = false;
//     const answer = s.split("")
//                     .reduce( (acc, cur) => {
//                         if(acc<0){
//                             fail = true;
//                         }
//                         return acc + (cur === "(" ? 1 : -1)
//                     },0)
//     return answer === 0 && !fail
// }
