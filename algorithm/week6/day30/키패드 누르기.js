function solution(numbers, hand) {
  /*
        1 -> (1,1)
        3 -> (1,3)
        9 -> (3,3)

        핸드폰키패드에 대한 좌표
    */
  // 초기세팅
  let left = [4, 1];
  let right = [4, 3];
  // 결과값을 담을배열 선언
  let result = [];

  // numbers 순회
  numbers.forEach((e) => {
    // y는 들어온 넘버에대한 나눗셈 3을하고 올려주면 좌표값이 나온다
    let y = Math.ceil(e / 3);
    // x는 3으로 나머지값
    let x = e % 3;
    // 만약 0이면 x좌표는 가장 맨끝(오른쪽손으로 누르는곳)
    if (x === 0) {
      x = 3;
    }
    // e가 0이라면 좌표를 0에 맞게 세팅해준다
    if (e === 0) {
      y = 4;
      x = 2;
    }
    // 다음으로 누를 숫자에대한 좌표값 세팅
    let next = [y, x];

    // 왼손으로 누르는 좌표값 설정
    if (e === 1 || e === 4 || e === 7) {
      left = next;
      result.push("L");
    } else if (e === 3 || e === 6 || e === 9) {
      // 오른손으로 누를 좌표값 설정
      right = next;
      result.push("R");
    } else {
      // 만약 가운데 숫자라면
      // 현재 왼쪽 손가락과 오른쪽 손가락의 좌표값을 비교해서
      let leftDis = dis(left, next);
      let rightDis = dis(right, next);

      // 만약 오른쪽 손가락 좌표값이 더 거리가 짧다면
      // 오른쪽
      if (leftDis > rightDis) {
        right = next;
        result.push("R");
      } else if (rightDis > leftDis) {
        // 반대상황
        left = next;
        result.push("L");
      } else if (rightDis === leftDis) {
        // 만약 두거리가 같다면 손이 오른쪽이냐,왼쪽이냐로 가른다
        if (hand === "right") {
          right = next;
          result.push("R");
        } else {
          left = next;
          result.push("L");
        }
      }
    }
  });
  // 최종적으로 들어온 결과값을 join시켜 반환
  return result.join("");
}

// 거리값을 계산하는함수
function dis(cur, nex) {
  let y, x;
  // y는 현재 left의 좌표값 (0) - 다음누를 좌표값 (0)의 절댓값을 넣는다
  y = Math.abs(cur[0] - nex[0]);
  // x는 현재 right의 좌표값 (1) - 다음누를 좌표값 (1)의 절댓값을 넣는다
  x = Math.abs(cur[1] - nex[1]);
  // 최종적으로 y와 x를 더한값이 거리값이 된다
  return y + x;
}
