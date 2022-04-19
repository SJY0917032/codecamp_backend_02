function solution(numbers) {
  // numbers를 sort함수로 정렬한다
  const answer = numbers
    .sort((a, b) => {
      // 30,34같은 경우에는 34가 앞으로 30이 앞으로 가야하므로
      // b와 a를 String형태로 바꿔준후 더해준다

      /**
       * 1. b(34), a(30) 3430 - 3034
       * 2. b가 앞으로온다
       * 3. 이런식으로 정렬을 마무리 한뒤
       * 4. join으로 숫자형태의 문자열을 만들어준다.
       */
      a = a.toString();
      b = b.toString();

      return b + a - (a + b);
    })
    .join("");

  // 근데 [0,0,0] 은 "0"의 형태로 나와야한다
  // 테스트케이스중 하나가 히든케이스로 계속나와서
  // 100,200 등등.. 다맞아서 그러면 0이 여러개일수도있겟구나 싶어서 삼항연산자로 처리
  // (앞이 0인경우는 0이 연속되는경우 말고 없기에)
  return answer[0] == 0 ? "0" : answer;
}
