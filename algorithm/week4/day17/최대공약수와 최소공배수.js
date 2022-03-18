/*
두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요.
배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다.
예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는 [3, 12]를 반환해야 합니다.
*/

function solution(n, m) {
  var answer = [];
  // 재귀함수를 이용해
  // 최대공약수를 먼저 구한다.
  function gcd(n1, n2) {
    if (n2 === 0) {
      return n1;
    } else {
      return gcd(n2, n1 % n2);
    }
  }
  // 그후 최소공배수를구한다.
  function lcm(n1, n2) {
    return (n1 * n2) / gcd(n1, n2);
  }
  answer.push(gcd(n, m));
  answer.push(lcm(n, m));
  return answer;
}
