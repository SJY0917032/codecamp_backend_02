function bigNum(str) {
  let biggest = 0;
  let temp = 0;
  str = str.split("");
  for (i = 0; i <= str.length; i++) {
    if (str[i] > temp) {
      temp = str[i];
      biggest = str[i];
    }
  }
  console.log(biggest);
}
bigNum("12345"); // 5
bigNum("87135"); // 8
