// Код до рефакторингу:
let total = 0;

function addToTotal(amount: number) {
  total += amount;
  return total;
}

// Код після рефакторингу:
function calculateNewTotal(currentTotal: number, amount: number): number {
  return currentTotal + amount;
}

const total = calculateNewTotal(0, 50);

