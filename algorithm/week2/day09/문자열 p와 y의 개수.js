/*
대문자와 소문자가 섞여있는 문자열 s가 주어집니다. s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요. 
'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.
*/
function solution(s) {
  // var answer = true;
  // let p = 0;
  // let y = 0;

  // // 일단 s를 모두 대문자로 바꾼다
  // s = s.toUpperCase();

  // // 문자열 s를 순회하면서 p면 p++ y면 y++
  // for (i = 0; i < s.length; i++) {
  //   if (s[i] === "P") {
  //     p++;
  //   } else if (s[i] === "Y") {
  //     y++;
  //   }
  // }

  // // 개수가 다르면 false 반환
  // if (p !== y) {
  //   answer = false;
  // }

  // return answer;
  // 리팩터링
  const check = {};

  s.toLowerCase()
    .split("")
    .forEach((str) => {
      check[str] === undefined
        ? // 객체에 할당된 키 데이터가 없다면
          (check[str] = 1)
        : // 객체에 할당된 키 데이터가 있다면 ++
          check[str]++;
    });
  return check.p === check.y;
}
