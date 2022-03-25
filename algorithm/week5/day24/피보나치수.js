/*
피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.
예를들어
F(2) = F(0) + F(1) = 0 + 1 = 1
F(3) = F(1) + F(2) = 1 + 1 = 2
F(4) = F(2) + F(3) = 1 + 2 = 3
F(5) = F(3) + F(4) = 2 + 3 = 5
와 같이 이어집니다.
2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.
제한 사항
n은 2 이상 100,000 이하인 자연수입니다.
*/
function solution(n) {
    let answer = 0;
    let a = 1;
    let b = 1;
    // 중요!! js는 int,long등 정수형 크기에대한 선언을 안하지만
    // overflow는 일어나기때문에 대비를해야한다
    for(i = 0; i < n-1; i++){
        // 정수형 오버플로를 막기위해 나눈값을 피보나치값으로 할당한다
        let c = (a+b) % 1234567 
        a = b;
        b = c;
        // 정답은 n번째 피보나치수를 나눈 나머지
        answer = a % 1234567
    }
    return answer
}