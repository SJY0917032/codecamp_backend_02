/*
정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.
*/
function solution(n) {
  var answer = 0;
  // 나누어지는 가장 최소값을 지정한다
  var index = 1;
  // n과 같은값이 될때까지 나눈다
  while (index <= n) {
    // n을 나누어 나머지가 되는 index를 answer에 더해준다
    if (n % index === 0) {
      answer += index;
    }
    index++;
  }
  return answer;
}
