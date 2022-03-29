const zzz = (data) => {
  console.log(data);
};

@zzz
class AppController {}

// public
class Aaa {
  constructor(public mypower) {
    this.mypower = 10;
  }
  ggg() {
    this.mypower = 10;
  }
}

const aaa = new Aaa(50);

// private
class Bbb {
  constructor(private mypower) {
    this.mypower = mypower;
  }
  ggg() {
    this.mypower = 10;
  }
}

const bbb = new Bbb(50);
// bbb.mypower = 10; 에러가뜬다.
