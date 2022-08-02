function fn(number) {
  return number * 2;
}

// 無名関数
// const fn = function(number) {
//   return number * 2;
// }

console.log(fn(2)); // 4

// アロー関数
const fnArrow = number => number * 2;

const fnArrow2 = (number, number2) => number + number2 * 2;

const fnArrow3 = number => {
  console.log(number); // 2
  return number * 2;
}

const fnArrowObj = number => ({ result: number * 2 });

console.log(fnArrow(2)); // 4
console.log(fnArrow2(1, 1)); // 3
console.log(fnArrow3(2)); // 4
console.log(fnArrowObj(2)); // {result: 4}result: 4[[Prototype]]: Object
