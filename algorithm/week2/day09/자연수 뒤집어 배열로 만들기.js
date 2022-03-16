/*
자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.
*/
function solution(n) {
  var answer = [];

  // 1. n을 문자열로 바꾼후
  // 2. 배열로 바꾼다.
  // 3. 바꾼 배열을 map을통해 숫자로 전환한다.
  // 4. 그리고 뒤집는다

  return (answer = String(n).split("").map(Number).reverse());
}
