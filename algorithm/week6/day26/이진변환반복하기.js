function solution(s) {
  // 정답을 담을 배열
  let answer = [];
  // 0이 삭제된 갯수
  let zeroCount = 0;
  // 변화한 횟수
  let changeCount = 0;

  // s를 1로 바꿀때까지 무한반복~
  while (s != "1") {
    s = s
      .split("") // 일단 들어온 s를 배열로 바꾼다
      .filter((e) => {
        // 필터를 통해서
        if (e === "0") {
          // 0이라면
          zeroCount++; // 0이 삭제된 횟수를 증가시키고
          return false; // 펄스로 반환
        } else {
          return true; // 0이아닌숫자 (1)이면 배열에 포함시킨다
        }
      })
      .join("") // 그리고 다시 문자열로 합친다
      .length.toString(2); // 그리고 그 길이를 2진법으로 다시 변환
    changeCount++; // 변화한 횟수를 증가시킨다
  }
  answer.push(changeCount); // 최종적으로
  answer.push(zeroCount); // 정답에 차례대로 push
  return answer;
}
