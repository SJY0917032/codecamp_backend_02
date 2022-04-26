function solution(citations) {
  /*전체 논문중 많이 인용된 순으로 정렬한 후, 
    피인용수가 논문수와 같아지거나 피인용수가
    논문수보다 작아지기 시작하는 숫자*/

  // 반환할 정답
  let answer = 0;
  // 정렬
  const N = citations.sort((a, b) => b - a);

  // 만약 끝의있는 정렬된 인옹수가 길이보다 길다면 길이를 그대로 반환
  if (N.length < N[N.length - 1]) {
    return N.length;
  }

  // N의 길이만큼 순회
  // 만약 현재 Index의 인용수가 인덱스보다 작거나 같아지면
  // H-index
  // 반복문 break;
  for (let i = 0; i < N.length; i++) {
    if (i >= N[i]) {
      answer = i;
      break;
    }
  }

  // 정답반환
  return answer;
}
