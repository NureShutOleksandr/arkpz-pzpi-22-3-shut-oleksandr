// Код до рефакторингу:
function processOrder(order: any) {
  // Валідація
  if (!order.id || !order.items.length) {
      throw new Error("Invalid order");
  }
  // Розрахунок ціни
  let total = 0;
  order.items.forEach((item: any) => {
      total += item.price * item.quantity;
  });
  // Створення чека
  console.log(`Order #${order.id} total: ${total}`);
  return total;
}

// Код після рефакторингу:
function validateOrder(order: any): void {
  if (!order.id || !order.items.length) {
      throw new Error("Invalid order");
  }
}

function calculateTotal(order: any): number {
  return order.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
}

function processOrder(order: any) {
  validateOrder(order);
  const total = calculateTotal(order);
  console.log(`Order #${order.id} total: ${total}`);
  return total;
}