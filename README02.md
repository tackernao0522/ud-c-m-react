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
