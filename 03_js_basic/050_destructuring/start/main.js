// const arry = ["配列1", "配列2", "配列3"];
// console.log(arry[0]); // 配列1
// console.log(arry[2]); // 配列3

// const [a, b, c] = ["配列1", "配列2", "配列3"];
// const [a, , c] = ["配列1", "配列2", "配列3"]; // 二つのみ取り出すこともできる
// console.log(a); // 配列1
// console.log(c); // 配列3

// const obj = { x: "オブジェクト1", y: "オブジェクト2", z: "オブジェクト3" };
// console.log(obj.x); // オブジェクト1
// console.log(obj.y); // オブジェクト2

// const { x, z } = { x: "オブジェクト1", y: "オブジェクト2", z: "オブジェクト3" };
// console.log(x); // オブジェクト1
// console.log(z); // オブジェクト3

const arr = ["Japan", "Tokyo", "Shinjuku"];
const objAddress = { country: "Japan", state: "Tokyo", city: "Shinjuku" };

// const fnArr = (arry) => {
//   console.log("---配列---");
//   console.log(`country: ${arry[0]}`); // country: Japan
//   console.log(`state: ${arry[1]}`); // state: Tokyo
//   console.log(`city: ${arry[2]}`); // city: Shinjuku
// };

const fnArr = ([country, state, city]) => {
  console.log("---配列---");
  console.log(`country: ${country}`); // country: Japan
  console.log(`state: ${state}`); // state: Tokyo
  console.log(`city: ${city}`); // city: Shinjuku
};

// const fnObj = (objAddr) => {
//   console.log("---オブジェクト---");
//   console.log(`country: ${objAddr.country}`); // country: Japan
//   console.log(`state: ${objAddr.state}`); // state: Tokyo
//   console.log(`city: ${objAddr.city}`); // city: Shinjuku
// };

const fnObj = ({ country, state, city }) => {
  console.log("---オブジェクト---");
  console.log(`country: ${country}`); // country: Japan
  console.log(`state: ${state}`); // state: Tokyo
  console.log(`city: ${city}`); // city: Shinjuku
};

fnArr(arr);
fnObj(objAddress);
