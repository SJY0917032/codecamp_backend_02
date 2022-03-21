/*
수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 
가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.
*/

function solution(answers) {
    var answer = [];
    

    // 수포자 삼인방의 정답 찍는 순서를 저장한다.
    const a = [1,2,3,4,5];
    const b = [2,1,2,3,2,4,2,5];
    const c = [3,3,1,1,2,2,4,4,5,5];
    

    // 정답찍는순서를 정답길이만큼 저장할 배열을 할당한다.
    let aa = []
    let bb = [] 
    let cc = []

    // 정답맞춘갯수를 만든다
    let acount = 0;
    let bcount = 0;
    let ccount = 0;
    

    // 문제를 돌면서 수포자 삼인방의 정답찍는순서를 저장하며
    // 맞는다면 수포자 삼인방의 맞춘갯수를 늘린다
    for (i = 0; i < answers.length; i++){
        let x1 = i % a.length
        let x2 = i % b.length
        let x3 = i % c.length
        aa.push(a[x1])
        bb.push(b[x2])
        cc.push(c[x3])
        
        if (answers[i] === aa[i]){
            acount++;
        }
        if (answers[i] === bb[i]){
            bcount++;
        }
        if (answers[i] === cc[i]){
            ccount++;
        }
        
    }

    // 삼인방중 가장 많이 맞춘사람의 갯수를 할당한다
    m = Math.max(acount,bcount,ccount)
    // 수포자 삼인방의 정답개수 배열을 만든다
    arr = [acount,bcount,ccount]


    // 삼인방을 돌면서 맥스값보다 크거나 같은 사람을
    // 정답 배열에 추가한다
    for (i = 0; i < arr.length; i++){
        if(arr[i] >= m){
            answer.push(i+1)
        }
    }
    return answer;
}