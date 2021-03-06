/*
프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.
또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.
먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.
제한 사항
- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

*/
// function solution(progresses, speeds) {
//   // 완료된 일자를 담을 배열
//   let complete = [];
//   // 배포일마다 배포되는 기능을 담을 배열
//   let sd = [0];
//   // 일단 개발율을 기준으로 for문을 돌린다
//   for (let i = 0; i < progresses.length; i++) {
//     // 해당 기능이 개발완료된 시점
//     let completeday = 0;
//     // 배열을돌아 개발이 완료가 될때까지 무한반복시킨다
//     while (progresses[i] < 100) {
//       // 개발이 완료가 안되면 개발완료시점을 증가시킨다
//       completeday++;
//       // 개발속도만큼 올려준다
//       progresses[i] = progresses[i] + speeds[i];
//       // 만약 더했는데 100보다 크거나 같으면 무한반복문을 탈출시킨다
//       if (progresses[i] >= 100) {
//         break;
//       }
//     }
//     // 무한반복문을 나온 시점의 개발완료일을 완료된일자 배열에 푸쉬한다
//     complete.push(completeday);
//   }
//   // 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다.
//   // 임시변수에 첫 배포가 가능한 일자를 넣는다
//   let temp = complete[0];
//   // 완료된 일자를 쭉 for문을 돌린다
//   for (i = 0, j = 0; i < complete.length; i++) {
//     // 만약 현재 완료된날이 임시변수에 담은 완료날보다 작다면
//     // 이미 완료된 기능이라 같이 배포가 가능하기에 배포일에 배포되는 기능의 숫자를 늘려준다
//     if (complete[i] <= temp) {
//       sd[j] += 1;
//     } else {
//       // 만약 크다면 현재 기능이 배포가 되고나서도 개발이 진행돼야지 배포가 가능하기에
//       // 임시변수를 다음 배포가능 날짜로 바꾼뒤
//       // 배포일(배포가능)배열을 늘려주면서 1을 담는다
//       temp = complete[i];
//       sd[++j] = 1;
//     }
//   }
//   // 최종적으로 배포일(배포가능) 배열을 리턴시켜준다
//   return sd;
// }

// 리팩터링

function solution(progresses, speeds) {
  let day = 0;

  /// 개발율만큼 reduce를 돌린다.
  const answer = progresses.reduce((acc, cur, i) => {
    // 개발완료일을 구한다
    const process = Math.ceil((100 - cur) / speeds[i]);
    // 만약 개발완료일보다 현재 기준일이 작다면
    if (process > day) {
      // 기준일을 갱신하고
      day = process;
      // reduce acc에 [1]을 넣는다
      acc[acc.length] = 1;
    } else {
      //  기준일보다 작은일수라면 현재 acc[]에 +1을 시켜준다
      acc[acc.length - 1] += 1;
    }
    return acc;
  }, []);

  // 정답반환
  return answer;
}
