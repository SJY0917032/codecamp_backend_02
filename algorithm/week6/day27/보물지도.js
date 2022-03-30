function solution(n, arr1, arr2) {
  // 답을 담을 배열선언
  let s_map = [];

  // 들어온 각 두배열을 비트 or 연산을한다
  arr1.forEach((e, i) => {
    s_map.push(e | arr2[i]);
  });

  // 비트연산이 끝난 배열을 map 메소드를통해 연산시작
  s_map = s_map.map((e) => {
    // 이진수형태의 String으로 변환
    e = e.toString(2);
    // 만약 n의 길이보다 짧다면 n의길이만큼 앞을 0으로 채워준다
    if (e.length !== n) {
      e = e.padStart(n, "0");
    }
    // 최종적으로 변환된 String형태를 배열로 분할해 새로운배열로 반환해준다
    e = e.split("").map((ele) => {
      // 0이면 공백
      if (ele === "0") {
        return " ";
      } else {
        // 1이면 벽
        return "#";
      }
    });
    // 합쳐준다
    e = e.join("");
    // 최종적으로 변환이 끝난 이진수를 반환해준다
    return e;
  });

  // 정답 반환
  return s_map;
}
