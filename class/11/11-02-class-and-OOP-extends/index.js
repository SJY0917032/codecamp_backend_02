class SkyUnit {
  run = () => {
    console.log("Run to SKY");
  };
}

class GroundUnit {
  constructor(data) {}

  run = () => {
    console.log("Run to Ground");
  };
}

class Monster extends GroundUnit {
  power = 10;

  constructor(data) {
    super(data);
  }

  attack = () => {
    console.log("attack now!!!");
    console.log(`my power is ${this.power} dmg`);
  };
}

const Mmonster = new Monster(200);

Mmonster.attack();
Mmonster.run();
