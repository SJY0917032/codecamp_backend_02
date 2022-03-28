function solution(board, moves) {
  // 답 result
  let result = 0;
  // 뽑은 인형을 담을 임시 배열
  let temp = [];

  // 움직이는 횟수만큼 움직인다.
  for (let k = 0; k < moves.length; k++) {
    // 현재 팔의위치를 잡아준다 (-1을한다)
    let armidx = moves[k] - 1;
    // 해당 팔의위치로 보드값을 찾는다
    for (let i = 0; i < board.length; i++) {
      // 만약 0이 아니라면 뽑은후에 해당 인덱스를 0으로 바꿔주고 다음 팔의위치로 변경한다
      if (board[i][armidx] !== 0) {
        temp.push(board[i][armidx]);
        board[i][armidx] = 0;
        break;
      }
      // 만약 0이라면 리턴값이 없다.
    }

    // 인형을 집을때마다
    // 배열을 탐색해서 쌓인 인형이있다면
    // 삭제한뒤 정답에 +2를 시켜준다
    temp.forEach((e, idx, arr) => {
      if (arr[idx] === arr[idx + 1]) {
        temp = temp.slice(0, -2);
        result += 2;
      }
    });
  }

  return result;
}
