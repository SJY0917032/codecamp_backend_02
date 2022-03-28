import { StarBucks } from "./models/coffee.model.js";

export async function getCoffee() {
  const coffees = await StarBucks.find();
  return coffees;
}
