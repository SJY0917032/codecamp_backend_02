function solution(dartResult) {
  // 숫자-문자-옵션을 정규식으로 3번을 나눈다
  let re = /\d+(\w(\*|#|))/g;
  // match활용
  let found = dartResult.match(re);
  // 저장될 각 횟수에대한 점수들
  let num = [];
  // 현재 들어갈 점수값을 임시변수로 넣는다
  let temp = 0;
  // 최종으로 반환할 다트게임의 점수
  let answer = 0;

  // 나눈 3번에대한 점수를 계산한다
  found.forEach((e) => {
    for (let i = 0; i < e.length; i++) {
      // 점수를 계산할때
      if (e[i] >= 0 && e[i] <= 9) {
        // 10이라면 1,0 이런식으로 나오기때문에
        // 10인경우 임시변수에 10을 넣고 2자리만큼 넘는다
        if (e[i] === "1" && e[i + 1] === "0") {
          temp = 10;
          i++;
        } else {
          // 아니라면 변수를 할당한다
          temp = e[i];
        }
      }
      // 숫자가 아닌경우(문자거나 옵션인경우)
      else {
        // S , D , T에 대해선 제곱한만큼 해당 횟수에대한 점수에 할당한다
        if (e[i] === "S") {
          num.push(temp);
        } else if (e[i] === "D") {
          num.push(Math.pow(temp, 2));
        } else if (e[i] === "T") {
          num.push(Math.pow(temp, 3));
        } else if (e[i] == "*") {
          // * => 현재와 그전값을 2를 곱한다
          num[num.length - 1] *= 2;
          num[num.length - 2] *= 2;
        } else if (e[i] == "#") {
          // 해당점수를 -(음수)로 변경시킨다
          num[num.length - 1] *= -1;
        }
      }
    }
  });

  // 최종적으로 나온 점수배열을
  // Number(e)형태로 정답에 더해준다
  num.forEach((e) => {
    answer += Number(e);
  });

  return answer;
}
