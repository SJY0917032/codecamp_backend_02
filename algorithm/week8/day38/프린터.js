function solution(priorities, location) {
  // 반환할 정답
  let answer = 0;
  // 인쇄작업의 중요도를 index와 중요도로 객체화시킨다.
  let prioritiesObj = priorities.map((e, i) => {
    return { index: i, priori: e };
  });

  // 무조건 리턴값이 있으므로
  // 리턴시킬때까지 무한반복
  while (true) {
    // 현재 Max값보다 작다면 무조건 마지막으로 가야하므로 Max값을구한다
    let max = Math.max(...prioritiesObj.map((e) => e.priori));
    // shift()로 맨앞의 객체를 뽑음
    let n = prioritiesObj.shift();
    // 만약 현재 max값과 객체안의 중요도값이 같다면
    if (max === n.priori) {
      // 인쇄시킴
      answer++;
      // 인쇄시킨 문서의 순서가 내가 요청한 문서의 순서와 같다면 몇번째로 인쇄됐는지 리턴시킨다.
      if (location === n.index) {
        return answer;
      }
    } else {
      // max값보다 작다면 무조건 뒤로가야하므로 push시킨다
      prioritiesObj.push(n);
    }
  }
}
