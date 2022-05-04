// function solution(clothes) {
//   let obj = {};
//   let answer = 1;

//   clothes.forEach((e) => {
//     const [key, value] = e;
//     if (obj[value]) {
//       obj[value] = obj[value] + 1;
//     } else {
//       obj[value] = 1;
//     }
//   });

//   for (const key of Object.values(obj)) {
//     answer *= key + 1;
//   }
//   return answer - 1;
// }

// 메서드 리팩터링
function solution(clothes) {
  return (
    Object.values(
      clothes.reduce((acc, cur) => {
        const [key, value] = cur;
        acc[value] = acc[value] ? acc[value] + 1 : 1;
        return acc;
      }, {}),
    ).reduce((acc, cur) => {
      return (acc *= cur + 1);
    }, 1) - 1
  );
}
