function solution(s) {
  // 규칙을 지키는 문자열
  let answer = 0;
  // s만큼 돈다
  for (let i = 0; i < s.length; i++) {
    // 스택에 괄호들을 쌓는다
    let stack = [];
    // 문자열을 순회하면서 stack에쌓는다.
    for (let j = 0; j < s.length; j++) {
      // 스택에 쌓음
      stack.push(s[j]);
      // 쌓은후에 stack[0]이 닫는괄호라면 break시켜 반복문을 탈출시킨다.
      if (stack[0] === "}" || stack[0] === "]" || stack[0] === ")") {
        break;
      }
      // 그후 stack을 join 시킨뒤
      stack = stack.join("");
      // 괄호들을 replace시켜 삭제시킨다.
      // 그후 split("")하여 다시 배열형태로 변환
      stack = stack.replace("()", "").replace("{}", "").replace("[]", "").split("");
    }
    // 반복문이 끝난뒤
    // 스택에 괄호가 없다면 올바른 괄호이므로 추가시킨다.
    if (stack.length === 0) {
      answer++;
    }
    // 그후 괄호를 회전시킨다.
    let t = s.split("");
    let temp = t.shift();
    t.push(temp);
    s = t.join("");
  }
  // 최종적으로 나온 올바른 괄호 갯수를 반환
  return answer;
}
