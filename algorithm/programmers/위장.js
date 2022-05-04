function solution(clothes) {
  // 의상종류에따른 갯수를 저장할 해쉬테이블
  let obj = {};
  // 기본적으로 무조건 1개는입는다
  let answer = 1;

  // 옷을 key value를가진 해쉬테이블에 의상종류를 key로 갯수만큼 증가시켜준다.
  clothes.forEach((e) => {
    const [key, value] = e;
    if (obj[value]) {
      obj[value] = obj[value] + 1;
    } else {
      obj[value] = 1;
    }
  });

  // answer에 의상종류만큼 곱한다음, 1을 더해준다
  for (const key of Object.values(obj)) {
    answer *= key + 1;
  }
  // 그리고 마지막에 모든옷을 벗은상태를 빼고 반환시켜준다
  return answer - 1;
}

// 메서드 리팩터링
function solution(clothes) {
  // 해당 메소드가 끝나면 정답이 리턴됨
  return (
    // reduce가 끝난 object를 values만 추출해, 반복가능한 배열의 형태로 바꾼다.
    Object.values(
      clothes.reduce((acc, cur) => {
        const [key, value] = cur;
        acc[value] = acc[value] ? acc[value] + 1 : 1;
        return acc;
      }, {}),
    ).reduce((acc, cur) => {
      // 나온 반복가능한 배열의 형태를 다시 reduce로 곱해주면서 기본(벗은상태)를 더해준다
      return (acc *= cur + 1);
    }, 1) - 1 // 그리고 reduce가 끝난 값에 전부벗은상태를 빼주면 정답
  );
}
