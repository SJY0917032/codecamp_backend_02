/*
날짜와 시간을 생성하는 함수.
*/

// const createDate = (year, month, day, hour, min, sec) => {
//   day = new Date(year, month - 1, day, hour, min, sec);
//   console.log(`오늘은 ${day.getFullYear()}년 ${day.getMonth()}월 ${day.getDate()}일 ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()} 입니다.`);
// };
// createDate(2020, 12, 2, 11, 30, 29);

const createDate = () => {
  let day = new Date();
  console.log(`오늘은 ${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일 ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()} 입니다.`);
};

createDate();
