function solution(new_id) {
  // 1.소문자로 바꿉니다
  new_id = new_id.toLowerCase();
  // 2.알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
  const reg2 = /[a-z]|\d|-|_|\./g;
  let new_id2 = new_id.match(reg2).join("");

  //3. 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
  const reg3 = /(\.+\.)/g;
  let new_id3 = new_id2.replace(reg3, ".");

  //4. 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
  let new_id4 = new_id3.split("");
  if (new_id4[0] === ".") {
    new_id4.shift();
  }
  if (new_id4[-1] === ".") {
    new_id4.pop();
  }
  // 5. new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
  if (new_id4.length === 0) {
    new_id4[0] = "a";
  }
  // 6.길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
  if (new_id4.length >= 16) {
    new_id4 = new_id4.slice(0, 15);
  }
  // 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
  if (new_id4.lastIndexOf(".") === new_id4.length - 1) {
    new_id4.pop();
  }

  // 7. new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
  if (new_id4.length <= 2) {
    let temp = new_id4[new_id4.length - 1];
    new_id4[1] = temp;
    new_id4[2] = temp;
  }

  return new_id4.join("");
}
