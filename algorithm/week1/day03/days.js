function days(month) {
  if (month === 2) {
    console.log("28");
    return;
  }
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    console.log("31");
  } else {
    console.log("30");
  }
  /*
  Object를 활용한다면
  Object[key] 를 활용해서 if문 없이도 추출이 가능하다.
    const obj = {
      1:  31,
      2: 28,
      ...
    }
    console.log(obj[month])
  */
}
days(1); // 31
days(2); // 28
days(4); // 30
