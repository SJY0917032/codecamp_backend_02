/*
임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, 
n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.
*/
function solution(n) {
  var answer = 0;
  // 좋은 코드는 아닌거같지만, 일단 임의의 양의 정수까지 for문을 돌려
  for (i = 0; i <= n; i++) {
    // 제곱인지 판별한다
    if (Math.pow(i, 2) == n) {
      // 맞으면 +1 시킨상태에서 제곱시켜 답에 대입시키고 반복문을 중단시킨다
      answer = Math.pow(i + 1, 2);
      break;
    } else {
      // 없으면 -1로 고정시킴
      answer = -1;
    }
  }
  return answer;
}
