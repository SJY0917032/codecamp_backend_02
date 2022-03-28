class Monster {
  power = 10;
  // Method
  attack = () => {
    console.log(`attack.k now ${this.power} dmg`);
  };

  run = () => {
    console.log("runner high");
  };

  // 생성자
  constructor(data) {
    this.power = data;
  }
}

const MMonster = new Monster();

MMonster.attack();
MMonster.run();

const MMonster2 = new Monster(50);

MMonster2.attack();
MMonster2.run();

// 객체지향
const loginService = new loginService();
loginService.login();
loginService.logout();
loginService.loginCheck();
