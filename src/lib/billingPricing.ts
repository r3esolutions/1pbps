export const billingDiscounts = {
  "1 Month": 10,
  "3 Months": 0,
  "6 Months": 5,
  "12 Months": 10,
  "24 Months": 15,
  "36 Months": 20
};

export function calculateDiscount(
  total:number,
  term:string
){
  const discount =
    billingDiscounts[
      term as keyof typeof billingDiscounts
    ] || 0;

  return Math.round(
    total * discount / 100
  );
}
