/*
두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.
*/
function solution(a, b) {
  let answer = 0;
  if (a === b) return a;

  // 편하게하려고 a가 만약에 b보다 크면 둘이 바꿈
  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }

  // 사이의 정수를 전부 더한다
  for (i = a; i <= b; i++) {
    answer += i;
  }
  return answer;
}
