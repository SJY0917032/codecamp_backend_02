/*
슈퍼 게임 개발자 오렐리는 큰 고민에 빠졌다. 그녀가 만든 프랜즈 오천성이 대성공을 거뒀지만, 
요즘 신규 사용자의 수가 급감한 것이다. 원인은 신규 사용자와 기존 사용자 사이에 스테이지 차이가 너무 큰 것이 문제였다.

이 문제를 어떻게 할까 고민 한 그녀는 동적으로 게임 시간을 늘려서 난이도를 조절하기로 했다. 
역시 슈퍼 개발자라 대부분의 로직은 쉽게 구현했지만, 실패율을 구하는 부분에서 위기에 빠지고 말았다. 
오렐리를 위해 실패율을 구하는 코드를 완성하라.

실패율은 다음과 같이 정의한다.
스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
전체 스테이지의 개수 N, 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 stages가 매개변수로 주어질 때,
실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열을 return 하도록 solution 함수를 완성하라.
*/
function solution(N, stages) {
  //     // key : 스테이지
  //     // value : 실패율
  //     let answer = new Map();
  //     // 최종적으로 Return할 배열
  //     temp = [];
  //     // 스테이지만큼
  //     for (i = 1; i < N+1; i++){
  //         // ii => 현재 스테이지에서 실패한사람들
  //         ii = 0;
  //         // jj => 현재 스테이지를 도달한사람들
  //         jj = 0;
  //         for(j = 0; j < stages.length; j++){
  //             if(i === stages[j]){
  //                ii++;
  //             }
  //             if(i <= stages[j]){
  //                 jj++;
  //             }
  //         }
  //         // 현재스테이지 - (실패율)
  //         answer.set(i, (ii / jj))
  //     }
  //     // 정렬을위해 배열로 바꾼다
  //     const mapToArray = [...answer];
  //     // value값기준으로 key값을 정렬한다.
  //     mapToArray.sort((a,b) => b[1] - a[1])
  //     // 최종적으로 리턴할 배열에
  //     // 한개씩 push시킨다
  //     for (let [key,val] of mapToArray){
  //         temp.push(key)
  //     }
  //    return temp

  // 리팩터링 - 객체형식으로
  // 스테이지를 오름차순으로 정렬
  stages.sort((a, b) => a - b);
  const infos = [];
  for (let i = 1; i <= N; i++) {
    infos.push({
      stage: i, // 현재스테이지의번호
      users: 0, // 클리어하지 못한 유저 (플레이중)
      fail: 0, // 스테이지의 실패율
    });
  }

  let allUsers = stages.length; // 모든 유저의 수(초기값)
  for (let i = 0; i < stages.length; i++) {
    // undefine 방지
    if (infos[stages[i] - 1]) {
      infos[stages[i] - 1].users++;
      // 현재 스테이지 번호와 다음 스테이지의 번호가 일치하지 않다면
      if (stages[i] !== stages[i + 1]) {
        const fail = infos[stages[i] - 1].users / allUsers;
        // 유저수를 빼준다
        allUsers -= infos[stages[i] - 1].users;
        infos[stages[i] - 1].fail = fail;
      }
    }
  }

  // 최종적으로 나온 데이터를 이용해서
  // 내림차순으로 정렬후,
  // 스테이지번호만 반환시켜준다.
  return infos
    .sort((a, b) => {
      return b.fail - a.fail;
    })
    .map((el) => el.stage);
}
