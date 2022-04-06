/**
 * N개의 자연수가 입력되면 각 자연수를 뒤집은뒤,
 * 그 뒤집은 수가 소수면 그 소수를 출력하라.
 * 예를들면, 32 => 23은 소수이고 23을 출력시킨다.
 * 단 910같은 숫자는 19이다. 첫자리의 0은 무시한다.
 */
const f = (n, numbers) => {
  if (numbers.length !== n) {
    return false;
  }

  let temp = numbers.map((e) => {
    st = String(e).split("").reverse();
    st.forEach((e) => {
      if (e.indexOf("0") == 0) {
        st.shift();
      }
    });
    st = Number(st.join(""));
    for (k = 2; k < st - 1; k++) {
      if (st % k === 0) {
        return 0;
      }
    }
    return st;
  });

  temp = temp.filter((e) => e !== 0 && e !== 1);
  console.log(temp);
};

f(9, [32, 55, 62, 20, 250, 370, 200, 30, 10]);
