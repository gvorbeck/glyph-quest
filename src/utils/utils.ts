export const rollDie: () => number = () => Math.floor(Math.random() * 6) + 1;

export const rollDice: (numDice: number) => number = (numDice = 1) => {
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += rollDie();
  }
  return total;
};
