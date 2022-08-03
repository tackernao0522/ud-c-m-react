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
