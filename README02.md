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
