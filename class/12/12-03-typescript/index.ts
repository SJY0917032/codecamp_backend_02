// TypeScript의 타입 추론
let aaa = "hello world";
// aaa = 3; // error!

// 타입 명시
let bbb: string = "this String Type";
// bbb = 3; // error!

// 불린
let eee: boolean = true;

// 배열
// 배열안의 숫자 혹은 스트링
let fff: (number | string)[] = [1, "2"];

// 객체 타입을 미리 지정하는 인터페이스
interface IProfile {
  name: String;
  age: number | string;
  school: string;
}

// 객체
let profile: IProfile = {
  name: "철철이",
  age: 99,
  school: "람쥐썬더",
};
// profile.age = "18살" // 객체안의 요소들또한 타입추론이 적용된다 에러!
profile.age = "18살"; // interface를통해 지정한 타입에 맞기때문에 더이상 에러가 안뜬다.

// 함수
const add = (money1: number, money2: number, unit: string): string => {
  // return type is String
  return money1 + money2 + unit;
};

add(1000, 2000, "원");
