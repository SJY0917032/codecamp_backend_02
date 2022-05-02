function solution(record) {
  let tempObj = {};
  let answer = [];

  /**
   *    Obj에 key(uid) : value(name)으로 저장한다
   *    "Enter uid1234 Muzi"
   *    이렇게 들어오기때문에 " "으로 split하게되면
   *    Enter, uid, name으로 분리가된다
   *    이를 이용해서 Obj에 저장한다.
   * */

  // Enter와 Change로 Obj에 아이디별 최종 Name을 저장한다.
  for (let i = 0; i < record.length; i++) {
    let temp = record[i].split(" ");
    if (temp[0] === "Enter") {
      tempObj[temp[1]] = temp[2];
    }
    if (temp[0] === "Change") {
      tempObj[temp[1]] = temp[2];
    }
  }

  // 최종 Name값을 이용
  // Enter했거나 Leave했을경우 Message를 push시킨다
  for (let i = 0; i < record.length; i++) {
    let temp = record[i].split(" ");
    // key = uid
    // value = name
    if (temp[0] === "Enter") {
      answer.push(`${tempObj[temp[1]]}님이 들어왔습니다.`);
    }
    if (temp[0] === "Leave") {
      answer.push(`${tempObj[temp[1]]}님이 나갔습니다.`);
    }
  }
  // push시킨 정답을 반환
  return answer;
}
