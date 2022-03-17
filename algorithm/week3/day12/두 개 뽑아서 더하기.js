/*
정수 배열 numbers가 주어집니다. 
numbers에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해주세요.
*/
function solution(numbers) {
  var answer = [];
  for (i = 0; i < numbers.length; i++) {
    // i앞의 인덱스부터 출발해서 더한값을 answer배열에서 안들어가있으면 push한다.
    for (j = i + 1; j < numbers.length; j++) {
      if (!answer.includes(numbers[i] + numbers[j])) {
        answer.push(numbers[i] + numbers[j]);
      }
    }
  }
  // 오름차순 정렬
  answer.sort((a, b) => a - b);
  return answer;
}
