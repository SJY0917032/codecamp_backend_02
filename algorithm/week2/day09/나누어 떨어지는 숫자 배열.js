/*
array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.
*/
function solution(arr, divisor) {
  // var answer = [];
  // // 나머지가 0인 숫자가 없으면 -1을 추가해야하기에
  // // 플래그로 구분한다.
  // let flag = false;

  // // 들어온 배열만큼 순회
  // for (i = 0; i < arr.length; i++) {
  //   // 나머지가 0인숫자면 정답에 푸쉬하면서
  //   // -1을 추가할수없게 플래그를 바꾼다
  //   if (arr[i] % divisor === 0) {
  //     answer.push(arr[i]);
  //     flag = true;
  //   }
  // }

  // // 나머지가 0인 숫자가 없다면 플래그는 펄스이므로
  // // -1을 추가해준다
  // if (flag === false) {
  //   answer.push(-1);
  // }

  // // 오름차순으로 정렬해서 반환
  // return answer.sort((a, b) => a - b);
      // 리팩터링
      const answer = arr.filter(num => {
        return num % divisor === 0
    })
    
    return answer.length === 0
        ? [-1]
        : answer.osrt( (a,b) => a - b)
}
