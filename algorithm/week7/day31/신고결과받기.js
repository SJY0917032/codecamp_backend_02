// function solution(id_list, report, k) {
//   // 아이디의 길이만큼 빈 배열을 하나 만든다.
//   let answer = Array.from({ length: id_list.length }, (_, i) => 0);
//   // 신고한 사람
//   let reporter = [];
//   // 신고받은 사람 = id_list와 동일한 인덱스를 가진 배열
//   let reports = Array.from({ length: id_list.length }, (_, i) => 0);

//   // 일단 신고의 중복을 제거한다.
//   report = new Set([...report]);
//   report = Array.from(report);

//   report = report
//     .join(" ")
//     .split(" ")
//     .forEach((e, i, arr) => {
//       if (i % 2 === 0) {
//         reporter.push(e);
//       } else {
//         reports[id_list.indexOf(e)] += 1;
//       }
//     });
//   //id_list에 인덱스에서 해당 사람이 신고받은 횟수를 기록하는 배열하나
//   //한개의 배열에는 해당사람이 신고한사람을 기록하는 배열하나
//   console.log(reporter);
//   console.log(reports);

//   // k -> 이상 신고당하면 이용정지
//   // 답 -> 유저가 신고한 게정이 정지를 당했다면 (메일이 발송됨)
// }

/// 4.6  현재 푸는중
// 이상태로풀면 분명 시간초과가 날거같아서 Map으로 바꾼후 풀생각중.. 잘안되네

// 4.25
// no Methods
// function solution(id_list, report, k) {
//   const users = {}; // 신고당한 사람이 몇번 신고당했는지
//   const reporter = {}; // 신고한 사람이 누구를 신고했는지

//   const answer = [];

//   // 중복데이터 미리제거
//   report = [...new Set(report)];

//   for (let i = 0; i < report.length; i++) {
//     const info = report[i].split(" ");

//     // 신고당한 사람의 신고횟수가 없다면 0으로 설정한다.
//     if (users[info[1]] === undefined) {
//       users[info[1]] = 0;
//     }

//     // 한사람이 여러사람을 신고했을수도 있다.
//     if (reporter[info[0]] === undefined) {
//       reporter[info[0]] = [];
//     }
//     users[info[1]]++;
//     reporter[info[0]].push(info[1]);
//   }

//   // 정지당한 유저를 신고한 유저에게 메일 보내기.
//   for (let i = 0; i < id_list.length; i++) {
//     const arr = reporter[id_list[i]] || [];
//     answer[i] = 0;

//     arr.forEach((e) => {
//       if (users[e] >= k) {
//         answer[i]++;
//       }
//     });
//   }
//   return answer;
// }
// Use Method
function solution(id_list, report, k) {
  const users = {}; // 신고당한 사람이 몇번 신고당했는지
  const reporter = {}; // 신고한 사람이 누구를 신고했는지

  // 중복신고 제거
  report = [...new Set(report)];

  report.forEach((e) => {
    // 공백을 기준으로 짤라준다
    const info = e.split(" ");

    if (users[info[1]] === undefined) users[info[1]] = 0;
    if (reporter[info[0]] === undefined) reporter[info[0]] = [];

    users[info[1]]++;
    reporter[info[0]].push(info[1]);
  });

  return id_list.map((e) => {
    const arr = reporter[e] || [];
    return arr.reduce((acc, cur) => {
      return acc + (users[cur] >= k);
    }, 0);
  });
}
