function solution(s) {
  // 정답을 반환할 문자열
  let answer = "";
  // 적당히 엄청 작은 수
  let MAX = -99999999;
  // 적당히 엄청 큰 수
  let MIN = 99999999;

  // s를 배열로 바꾼뒤 forEach
  s.split(" ").forEach((e) => {
    // 현재값은 정수로 바꾼 e
    let temp = parseInt(e);
    // 만약 max보다 크면 최댓값 교체
    if (MAX <= temp) {
      MAX = temp;
    }
    // 만약 min보다 작으면 최솟값 교체
    if (MIN >= temp) {
      MIN = temp;
    }
  });

  // 반복문이 끝난뒤의 MIN과 MAX를 정답문자열에 형태에 맞게 더해줌
  answer += MIN + " ";
  answer += MAX + "";

  // 반환
  return answer;
}
