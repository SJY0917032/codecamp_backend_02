function solution(number, k) {
  // 정답 배열
  let answer = [];

  // number만큼돈다
  for (let i = 0; i < number.length; i++) {
    /**
     * 1. k(자를숫자)가 남아있다면
     * 2. 정답배열의 마지막숫자가 현재 index숫자보다 작다면
     * 3. 맨뒤의숫자 (pop)를 제거하고
     * 4. 자를숫자 횟수를 감소시켜준다
     */
    while (k > 0 && answer[answer.length - 1] < number[i]) {
      answer.pop();
      k -= 1;
    }
    // 만약  자를횟수가없고, 현재 number가 answer보다 작으면 정답배열에 추가
    answer.push(number[i]);
  }

  // 최종적으로 나온 answer를 .join시켜서 반환한다
  // "111111111"과 같은 상황이나오면
  // k가 감소를 하지않으므로, k만큼 잘라서 반환시켜준다
  return answer.join("").slice(0, answer.length - k);
}
