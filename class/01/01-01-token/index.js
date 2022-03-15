console.log("안녕하세요~~");

getToken = () => {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return result;
};

console.log(getToken());
