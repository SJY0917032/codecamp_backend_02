function solution(msg) {
  // indexOf + 1을 할필요없이
  // 미리 0을추가해서 1~27 형태로 만들어준다
  // index는 A~Z까지 split형태 (Array)
  const index = "0ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  // 반환할 정답배열
  const answer = [];
  // 문자열을 자를 idx
  let idx = 0;
  // 들어오는 문자열을 다자를때까지 (answer에 다 push가 완료된상태)
  while (msg.length !== 0) {
    // current
    let w = "";
    // current + Next Word
    let wc = "";
    for (let i = 0; i < msg.length; i++) {
      // 앞의글자를 자른다
      w = msg.slice(0, i);
      // wc는 i+1
      wc = msg.slice(0, i + 1);
      // 만약 wc가 없다면
      if (index.indexOf(wc) === -1) {
        // answer에 w의 index를 넣고
        answer.push(index.indexOf(w));
        // 자를 idx는 현재 i값
        idx = i;
        break;
      }
      // 마지막 글자의 경우
      if (i === msg.length - 1) {
        // wc를 그대로 넣는다
        answer.push(index.indexOf(wc));
        // 자를 idx는 i+1(문자열의 마지막까지 잘라야하므로)
        idx = i + 1;
        break;
      }
    }
    // 반복문이 끝나면 index에 wc를 넣어주고 (새로 색인시켜주기)
    index.push(wc);
    // msg를 최종적으로 나온 idx값으로 슬라이스시켜준다.
    msg = msg.slice(idx);
  }
  return answer;
}
