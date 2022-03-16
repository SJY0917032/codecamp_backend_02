/*
문자열 s는 한 개 이상의 단어로 구성되어 있습니다. 
각 단어는 하나 이상의 공백문자로 구분되어 있습니다. 
각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 리턴하는 함수, solution을 완성하세요.
*/
function solution(s) {
  var answer = "";

  // 일단 들어온 문자를 공백기준으로 나눔.
  answer = s.split(" ");

  // 나눈 단어를 순회
  for (i = 0; i < answer.length; i++) {
    // 만든 이상한 문자를 저장할 임시변수 지정
    temp = "";
    // 나눈 단어의 글자마다 순회
    for (j = 0; j < answer[i].length; j++) {
      // 0이거나 짝수면 어퍼케이스
      if (j % 2 === 0) {
        temp += answer[i][j].toUpperCase();
      }
      // 홀수면 로우케이스로
      else {
        temp += answer[i][j].toLowerCase();
      }
    }
    // 최종적으로 만든 이상한 문자를 순회한 단어와 바꿈
    answer[i] = temp;
  }
  // 공백을 기준으로 다시 배열을 문자열로 변환한다
  answer = answer.join(" ");

  return answer;
}
