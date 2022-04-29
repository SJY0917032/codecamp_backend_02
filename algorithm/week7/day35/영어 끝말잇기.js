// 4.29 풀다가만거
// function solution(n, words) {
//     // 마지막글자
//     const lastword = (word) => {
//         return word[word.length - 1]
//     }

//     let answer = []
//     let count = 0;
//     let nArray = Array.from({length:n}, () => [])
//     for(let i = 0; i < words.length; i++){
//         nArray[i % n].push(words[i])
//     }

//     for(let i = 0; i < nArray.length; i++){

//     }

//     return answer
// }

// Solution
// function solution(n, words) {
//   const lastword = (word) => {
//     return word[word.length - 1];
//   };
//   for (let i = 1; i < words.length; i++) {
//     const currentUser = (i % n) + 1;
//     const currentTurn = Math.floor(i / n) + 1;

//     const prv = lastword(words[i - 1]);
//     const cur = words[i][0];

//     // 앞에 말한 플레이어의 마지막 알파벳과
//     // 내가 말한 첫번째 알파벳이 동일하지 않다면.
//     if (prv !== cur || words.indexOf(words[i]) !== i) {
//       return [currentUser, currentTurn];
//     }
//   }

//   return [0, 0];
// }

// Solution - Method
function solution(n, words) {
  let stop = false;
  const lastword = (word) => {
    return word[word.length - 1];
  };

  return words.slice(1).reduce(
    (acc, cur, i) => {
      const prv = lastword(words[i]);
      i++;
      const curUser = (i % n) + 1;
      const curTurn = Math.floor(i / n) + 1;

      if (stop === false) {
        if (cur[0] !== prv || words.indexOf(cur) !== i) {
          stop = true;
          return [curUser, curTurn];
        }
      }

      return acc;
    },
    [0, 0],
  );
}
