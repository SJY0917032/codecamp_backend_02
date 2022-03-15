/*
단어 s의 가운데 글자를 반환하는 함수, 
solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.
*/
function solution(s) {
  var answer = "";
  // 짝수라면
  if (s.length % 2 === 0) {
    // 가운데인덱스를 구한다
    let middle = Math.floor(s.length / 2) - 1;
    // 가운데인덱스 글자 추가후 다음인덱스 추가
    answer += s[middle];
    answer += s[middle + 1];
    // 홀수라면
  } else {
    // 가운데인덱스를 구한다
    let middle = Math.floor(s.length / 2);
    // 가운데인덱스 글자 추가
    answer += s[middle];
  }

  return answer;
}
