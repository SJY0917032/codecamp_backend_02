/*

날짜와 시간을 생성하는 함수.

“오늘은 2020년 12월 2일 11:30:29 입니다.”
*/

const createDate = (year, month, day, hour, min, sec) => {
  day = new Date(year, month - 1, day, hour, min, sec);
  console.log(`오늘은 ${day.getFullYear()}년 ${day.getMonth()}월 ${day.getDate()}일 ${day.getHours()}:${day.getMinutes()}:${day.getSeconds()} 입니다.`);
};

createDate(2020, 12, 2, 11, 30, 29);
