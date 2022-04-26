function solution(people, limit) {
  // 무개 순서대로 줄을세운다
  people.sort((a, b) => b - a);
  let answer = 0;
  // 투포인터에서 맨앞사람이 만약 보트 무게의 절반이하가 된다면
  const half = limit / 2;

  // 투포인터 할당
  let p1 = 0;
  let p2 = people.length - 1;

  // 투포인터 반복문
  while (p1 <= p2) {
    // 만약  pointer1이 무게절반이하가 된다면
    if (people[p1] <= half) {
      // 남은 사람 수의 절반의 보트를 더해준다
      answer += Math.ceil((p2 + 1 - p1) / 2);
      break;
    }

    // 만약 p1과 p2의사람의 무게가 limit 이하라면
    if (people[p1] + people[p2] <= limit) {
      p1++;
      p2--;
      answer++;
      // 둘다 태워보낸다
    } else {
      // 아니라면 한명만 보내버린다
      p1++;
      answer++;
    }
  }
  // 최종적으로 필요했던 보트수를 반환
  return answer;
}
