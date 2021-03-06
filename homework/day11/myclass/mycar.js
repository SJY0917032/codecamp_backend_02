class MyCar {
  Model = "Damas";
  HorsePower = 1;
  Color = "YongDalBlue";

  StartToCar = () => {
    console.log(`${this.Model}이(가) ${this.HorsePower}마력의 속도로 출발했습니다!`);
  };

  StopToCar = () => {
    console.log(`${this.Model}이 멈췄습니다!`);
  };

  constructor(Model, HorsePower, Color) {
    this.Model = Model;
    this.HorsePower = HorsePower;
    this.Color = Color;
  }
}

const Beetle = new MyCar("Beetle", "10000", "Green");

Beetle.StartToCar();
Beetle.StopToCar();
