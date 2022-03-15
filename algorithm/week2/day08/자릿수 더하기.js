/*
자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.
*/
function solution(n) {
  var answer = 0;
  //   형변환으로 문자열로 변환
  let s = String(n);
  for (i = 0; i < s.length; i++) {
    // 정수형으로 변환후 더한다.
    answer += Number(s[i]);
  }
  return answer;
}
