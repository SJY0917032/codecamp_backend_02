console.log("BE 02 Day01 03-14");

getToken = (n) => {
  if (n === undefined) {
    console.log("Error! 갯수를 제대로 입력해주세요!");
    return;
  } else if (n <= 0) {
    console.log("Error! 갯수가 너무 적습니다!");
    return;
  } else if (n > 10) {
    console.log("Error! 갯수가 너무 많아요!");
    return;
  }
  const result = String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, "0");
  console.log(result);
};

getToken(3);
