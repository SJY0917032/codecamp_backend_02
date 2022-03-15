function makeOdd(num) {
  let str = "";
  for (i = 0; i <= num; i++) {
    if (i % 2 !== 0) {
      str += String(i);
    }
  }
  console.log(str);
}
makeOdd(5); // 135
makeOdd(7); // 1357
