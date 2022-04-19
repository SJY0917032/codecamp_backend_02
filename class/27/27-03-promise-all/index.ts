const fetchData = async () => {
  console.time("AAA JUST PROMISE");
  const result1 = await new Promise((resolve, reject) => {
    // API SEND...
    // if success
    // resolve()
    // and.. fail
    // reject()
    setTimeout(() => {
      try {
        resolve("성공시 받는 데이터입니다.");
      } catch (error) {
        reject("실패해버렷네;");
      }
    }, 2000);
  });
  const result2 = await new Promise((resolve, reject) => {
    // API SEND...
    // if success
    // resolve()
    // and.. fail
    // reject()
    setTimeout(() => {
      try {
        resolve("성공시 받는 데이터입니다.");
      } catch (error) {
        reject("실패해버렷네;");
      }
    }, 4000);
  });
  const result3 = await new Promise((resolve, reject) => {
    // API SEND...
    // if success
    // resolve()
    // and.. fail
    // reject()
    setTimeout(() => {
      try {
        resolve("성공시 받는 데이터입니다.");
      } catch (error) {
        reject("실패해버렷네;");
      }
    }, 3000);
  });
  console.log(result1);
  console.log(result2);
  console.log(result3);
  console.timeEnd("AAA JUST PROMISE");
};

const fetchData2 = async () => {
  console.time("BBB PROMISE ALL");
  await Promise.all([
    new Promise((resolve, reject) => {
      // API SEND...
      // if success
      // resolve()
      // and.. fail
      // reject()
      setTimeout(() => {
        try {
          resolve("성공시 받는 데이터입니다.");
        } catch (error) {
          reject("실패해버렷네;");
        }
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      // API SEND...
      // if success
      // resolve()
      // and.. fail
      // reject()
      setTimeout(() => {
        try {
          resolve("성공시 받는 데이터입니다.");
        } catch (error) {
          reject("실패해버렷네;");
        }
      }, 4000);
    }),
    new Promise((resolve, reject) => {
      // API SEND...
      // if success
      // resolve()
      // and.. fail
      // reject()
      setTimeout(() => {
        try {
          resolve("성공시 받는 데이터입니다.");
        } catch (error) {
          reject("실패해버렷네;");
        }
      }, 3000);
    }),
  ]);
  console.timeEnd("BBB PROMISE ALL");
};

fetchData();
fetchData2();
