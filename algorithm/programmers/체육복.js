/**
 *
 * 전체학생 2 ~ 30
 *
 * 도난 학생 1 - n 이하 중복 x
 * 여벌 학생 1 - n 이하 중복 x
 *
 * 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다.
 * 여벌 체육복 있는 학생만 다른학생 빌림 가능
 *
 * 여벌 가져온 사람도 도난을 당했을수있고 다른학생에게 빌려주기 x
 *
 */

function solution(n, lost, reserve) {
  // 일단 체육복 잃어버린사람중 여분이 있는지 체크한다
  lost = lost.filter((e) => {
    if (reserve.includes(e)) {
      const temp = reserve.indexOf(e);
      reserve.splice(temp, 1);
      return false;
    }
    return true;
  });
  // 그 후 탐욕법 시작

  // 일단 lost와 reserve에서 같은걸 비교하기위해 sort시켜준다
  // 1. 여기서 문제가 처음발생했는데 얕은벅사로 인해서 for문의 반복이 줄어든만큼만 진행되는 에러..
  // 2. 그래서 깊은복사를 시켜줌
  const sortedLost = JSON.parse(JSON.stringify(lost.sort((a, b) => a - b)));
  const sortedReserve = JSON.parse(JSON.stringify(reserve.sort((a, b) => a - b)));

  // 깊은복사가 이뤄진 배열을 이용해 잃어버린 체육복을 돌린다
  lost.forEach((e) => {
    // 만약 +1, -1 인 숫자가있으면 정렬한 잃어버린 체육복 배열과 여분의 체육복 배열에서 splice시킨다.
    if (sortedReserve.includes(e - 1)) {
      sortedReserve.splice(sortedReserve.indexOf(e - 1), 1);
      sortedLost.splice(sortedLost.indexOf(e), 1);
    } else if (sortedReserve.includes(e + 1)) {
      sortedReserve.splice(sortedReserve.indexOf(e + 1), 1);
      sortedLost.splice(sortedLost.indexOf(e), 1);
    }
  });

  // 최종적으로 정렬과 반복문이 끝난 잃어버린 체육복의 갯수를 계산하고
  let lostCount = sortedLost.length;

  // 전체학생의 수에서 감소시켜준다
  return n - lostCount;
}
