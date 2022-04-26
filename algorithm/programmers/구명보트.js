function solution(people, limit) {
  // 무게 순서대로 사람을 줄 세웁니다.
  // 맨 앞에 있는 사람이랑 맨 뒤에 있는 사람이랑 보트에 담을 수 있으면 같이 보냅니다.
  // 같이 못 보내면 맨 앞의 사람만 보트에 태워서 보내버립니다.
  // 이걸 반복하다가, 맨 앞의 사람이 보트 제한 무게의 절반 이하가 되면,
  // 무조건 맨 뒤의 사람과 같이 보낼 수 있으므로 남은 사람은 남은 사람 수의 절반의 보트만 있으면 됩니다.
  people.sort((a, b) => b - a);
  let answer = 0;
  const half = limit / 2;
  let p1 = 0;
  let p2 = people.length - 1;

  while (p1 <= p2) {
    if (people[p1] <= half) {
      answer += Math.ceil((p2 + 1 - p1) / 2);
      break;
    }
    if (people[p1] + people[p2] <= limit) {
      p1++;
      p2--;
      answer++;
    } else {
      p1++;
      answer++;
    }
  }
  return answer;
}
