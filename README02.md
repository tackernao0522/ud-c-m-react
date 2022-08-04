# dsznajder.es7-react-js-snippetsの説明

+ [参考](https://github.com/dsznajder/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md)<br>

# セクション3: Reactで頻出のJavaScript記法

## 8. npmコマンドの使い方

+ `$ cd 03_js_basic/010_npm_cli`を実行<br>

+ `$ npm install`を実行<br>

+ `$ npm install jquery`を実行<br>

+ `$ npm rm jquery`を実行<br>

## 10. アロー関数の記法について学ぼう

+ `03_js_basic/020_arrow_function/start/main.js`を編集<br>

```js:main.js
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
```

## 11. ESModuleのExport/Importについて学ぼう

+ `03_js_basic/030_esmodule/start/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>開始時点コード</title>
  </head>
  <body>
    <h1>開始時点コード</h1>
    <!-- 編集 -->
    <script type="module" src="main.js"></script>
  </body>
</html>
```

+ `03_js_basic/030_esmodule/start/module.js`を編集<br>

```js:module.js
export const hello = () => {
  console.log("hello!");
};

const funcB = () => {
  console.log("funcB output");
};

export default funcB;

class User {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log(this.name);
  }
}

export { User }
```

+ `03_js_basic/030_esmodule/start/main.js`を編集<br>

```js:main.js
import funcB, { hello, User } from "./module.js"; // funcBの部分は好きな名前に変更できる(default exportの場合)

hello(); // hello!
const user = new User('Takaki');
user.hello(); // Takaki
funcB(); // funcB output
```

## 12. コールバック関数の挙動について学ぼう

+ `03_js_basic/040_callback/start/main.js`を編集<br>

```js:main.js
function print(callback) {
  console.log(callback); // fnの関数が渡ってきている
  const result = callback(); // fn関数を実行して resultに代入
  console.log(result); // 6
}

function fn(number = 3) {
  return number * 2;
}

print(fn);
```

+ `03_js_basic/040_callback/start/main.js`を編集<br>

```js:main.js
function print(callback) {
  console.log(callback); // fnの関数が渡ってきている
  const result = callback(2); // fn関数を実行して resultに代入(fn関数の呼び出し元になる) number * 2　が返ってくる
  console.log(result); // 4
}

function fn(number = 3) {
  return number * 2;
}

print(fn);
```

+ `03_js_basic/040_callback/start/main.js`を編集<br>

```js:main.js
function print(callback) {
  console.log(callback); // fnの関数が渡ってきている
  const result = callback(2); // fn関数を実行して resultに代入(fn関数の呼び出し元になる) number * 2　が返ってくる
  console.log(result); // 4
}

function fn(number = 3) {
  return number * 2;
}

debugger;
print(fn);
```

+ `03_js_basic/045_eventlistener/start/main.js`を編集<br>

```js:main.js
const h1Element = document.querySelector('h1');
// console.log(h1Element); // <h1>開始時点コード</h1>
console.dir(h1Element); // h1 オブジェクトのプロパティが見れる
console.log(h1Element.textContent); // 開始時点コード
h1Element.textContent = '変更後のタイトル';
```

+ `03_js_basic/045_eventlistener/start/main.js`を編集<br>

```js:main.js
const h1Element = document.querySelector('h1');
// console.log(h1Element); // <h1>開始時点コード</h1>
console.dir(h1Element); // h1 オブジェクトのプロパティが見れる
console.log(h1Element.textContent); // 開始時点コード
h1Element.textContent = '変更後のタイトル';

const btnEl = document.querySelector('button');
btnEl.addEventListener('click', (e) => {
  // console.log(e.target); // <button>クリック</button>
  // console.dir(e.target); // button要素のDOMオブジェクトが取れる
  console.dir(e.target.textContent); // クリック
  console.log('hello'); // クリックする度にconsoleに 'hello'と表示される
});
```

+ `03_js_basic/045_eventlistener/start/main.js`を編集<br>

```js:main.js
const h1Element = document.querySelector('h1');
// console.log(h1Element); // <h1>開始時点コード</h1>
console.dir(h1Element); // h1 オブジェクトのプロパティが見れる
console.log(h1Element.textContent); // 開始時点コード
h1Element.textContent = '変更後のタイトル';

const btnEl = document.querySelector('button');
const helloFn = (e) => {
  console.dir(e.target.textContent);
  console.log('hello')
}
btnEl.addEventListener('click', helloFn);
```

## 14. 配列のmap、filterメソッドについて学ぼう

+ `03_js_basic/047_array_method/start/main.js`を編集(map)<br>

```js:main.js
const arry = [10, 20, 30, 40];
const newArry = [];

for (let i = 0; i < arry.length; i++) {
  newArry.push(arry[i] * 2);
}

console.log(newArry); // (4) [20, 40, 60, 80]

// mapメソッド
const newArry2 = arry.map(val => val * 2);

const newArry3 = arry.map(val => {
  console.log(val); // 10 20 30 40
  return val * 3;
})

const newArry4 = arry.map((val, i, arry) => {
  console.log(val, i, arry);
  return val * 4;
})

console.log(newArry2); // (4) [20, 40, 60, 80]
console.log(newArry3); // (4) [30, 60, 90, 120]
console.log(newArry4); // (4) [40, 80, 120, 160]
```

+ `03_js_basic/047_array_method/start/main.js`を編集(filter)<br>

```js:main.js
const arry = [10, 20, 30, 40];
const newArry = [];

for (let i = 0; i < arry.length; i++) {
  const val = arry[i] * 2;
  if (val > 50) {
    newArry.push(arry[i] * 2);
  }
}

console.log(newArry); // (4) [60, 80]

// mapメソッド
const newArry2 = arry.map(val => val * 2);
// filterメソッド
const newArry3 = newArry2.filter(val => val > 50);

console.log(newArry2)
console.log(newArry3);  // (4) [60, 80]
```

+ `03_js_basic/047_array_method/start/main.js`を編集(filter)<br>

```js:main.js
const arry = [10, 20, 30, 40];
const newArry = [];

for (let i = 0; i < arry.length; i++) {
  const val = arry[i] * 2;
  if (val > 50) {
    newArry.push(arry[i] * 2);
  }
}

console.log(newArry); // (4) [60, 80]

// mapメソッドからfilterメソッドを連結する
const newArry2 = arry.map(val => val * 2).filter(val => val > 50);

console.log(newArry2);  // (4) [60, 80]
```

## 15. 分割代入について学ぼう

+ `03_js_basic/050_destructuring/start/main.js`を編集<br>

```js:main.js
// const arry = ["配列1", "配列2", "配列3"];
// console.log(arry[0]); // 配列1
// console.log(arry[2]); // 配列3

// const [a, b, c] = ["配列1", "配列2", "配列3"];
const [a, , c] = ["配列1", "配列2", "配列3"]; // 二つのみ取り出すこともできる
console.log(a); // 配列1
console.log(c); // 配列3

// const obj = { x: "オブジェクト1", y: "オブジェクト2", z: "オブジェクト3" };
// console.log(obj.x); // オブジェクト1
// console.log(obj.y); // オブジェクト2

const { x, z } = { x: "オブジェクト1", y: "オブジェクト2", z: "オブジェクト3" };
console.log(x); // オブジェクト1
console.log(z); // オブジェクト3

// const arr = ["Japan", "Tokyo", "Shinjuku"];
// const objAddress = { country: "Japan", state: "Tokyo", city: "Shinjuku" };

// const fnArr = (arry) => {
//   console.log("---配列---");
//   console.log(`country: ${arry[0]}`);
//   console.log(`state: ${arry[1]}`);
//   console.log(`city: ${arry[2]}`);
// };

// const fnObj = (objAddr) => {
//   console.log("---オブジェクト---");
//   console.log(`country: ${objAddr.country}`);
//   console.log(`state: ${objAddr.state}`);
//   console.log(`city: ${objAddr.city}`);
// };

// fnArr(arr);
// fnObj(objAddress);
```

+ `03_js_basic/050_destructuring/start/main.js`を編集<br>

```js:main.js
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
```

## 16. スプレッド演算子と残余引数について学ぼう

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
const nums = [3, 1, 4, 1, 5, 10, 2, 6];

// const result = Math.max(3, 1, 4, 1, 5, 10, 2, 6);
const result = Math.max(...nums); // スプレッド演算子
console.log(result); // 10
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1];

console.log(newArr); // (3) [1, 2, 3]
console.log(newArr === arr1); // false
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1];
let newArr1 = arr1;

console.log(newArr1); // (3) [1, 2, 3]
console.log(newArr1 === arr1); // true
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1];
let newArr1 = arr1;

newArr1.push(4);
console.log(newArr1, arr1); //  [1, 2, 3, 4] (4) [1, 2, 3, 4]
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1];
let newArr1 = arr1;

newArr.push(4);
console.log(newArr, arr1); // (4) [1, 2, 3, 4] (3) [1, 2, 3]
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1, ...arr2];
let newArr1 = arr1;

console.log(newArr); // (6) [1, 2, 3, 4, 5, 6]
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1, ...arr2, 10];
let newArr1 = arr1;

console.log(newArr); // (7) [1, 2, 3, 4, 5, 6, 10]
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let newArr = [...arr1, 10, ...arr2];
let newArr1 = arr1;

console.log(newArr); // (7) [1, 2, 3, 10, 4, 5, 6]
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
const obj = {
  name: "Tom",
  age: 22,
};
const newObj = { ...obj };

console.log(newObj); // {name: 'Tom', age: 22}
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
const obj = {
  name: "Tom",
  age: 22,
};
const newObj = { ...obj };
newObj.name = 'John';
console.log(newObj, obj); // {name: 'John', age: 22} {name: 'Tom', age: 22}
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
const restA = (...argA) => console.log(argA); // (3) [1, 3, 4]
restA(1, 3, 4)
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
const restA = (...argA) => console.log(argA); // (4) [1, 3, 4, 5]
restA(1, 3, 4, 5)
```

+ `03_js_basic/060_spread_rest/start/main.js`を編集<br>

```js:main.js
const restB = (n, ...argB) => console.log(argB, n); // (2) [3, 4] 1 n に 1 が入る
restB(1, 3, 4)
```
