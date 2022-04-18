function solution(lottos, win_nums) {
  // 맞춘횟수
  let count = 0;
  // 알아볼수 없는 숫자
  let zeroCount = 0;
  // 정답 (최고순위, 최저순위)
  let answer = [0, 0];

  // 구매한 로또를 돈다
  lottos.forEach((e) => {
    // 만약 해당숫자가 당첨된 숫자라면
    if (win_nums.includes(e)) {
      // 맞춘횟수를 추가시킨다.
      count++;
    }
    // 0이라면 알아볼수 없는숫자에 추가시킨다
    if (e === 0) {
      zeroCount++;
    }
  });
  // 최종적으로 최고순위는 로또 판별함수로 맞춘횟수와 0인 횟수를 더해서
  answer[0] = lotto(count + zeroCount);
  // 최저순위는 그냥 맞춘횟수만
  answer[1] = lotto(count);

  // 리턴
  return answer;
}

function lotto(nums) {
  if (nums === 6) {
    return 1;
  } else if (nums === 5) {
    return 2;
  } else if (nums === 4) {
    return 3;
  } else if (nums === 3) {
    return 4;
  } else if (nums === 2) {
    return 5;
  } else {
    return 6;
  }
}
