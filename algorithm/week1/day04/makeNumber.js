function makeNumber(num) {
  let str = "";
  for (i = 1; i <= num; i++) {
    str += String(i);
  }
  str = str.split("");
  str = str.join("-");
  console.log(str);
}
makeNumber(5); // 1-2-3-4-5
makeNumber(7); // 1-2-3-4-5-6-7
