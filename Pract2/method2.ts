// Код до рефакторингу:
function calculateDiscount(order: any) {
  if (order.type === "regular") {
      return order.amount * 0.05;
  } else if (order.type === "premium") {
      return order.amount * 0.1;
  } else if (order.type === "vip") {
      return order.amount * 0.2;
  } else {
      return 0;
  }
}

// Код після рефакторингу:
interface DiscountStrategy {
  calculate(order: any): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(order: any): number {
      return order.amount * 0.05;
  }
}

class PremiumDiscount implements DiscountStrategy {
  calculate(order: any): number {
      return order.amount * 0.1;
  }
}

class VipDiscount implements DiscountStrategy {
  calculate(order: any): number {
      return order.amount * 0.2;
  }
}

function calculateDiscount(order: any, strategy: DiscountStrategy): number {
  return strategy.calculate(order);
}

