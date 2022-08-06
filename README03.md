## 17. 参考演算子について学ぼう

+ `03_js_basic/070_conditional_operator/start/main.js`を編集<br>

```js:main.js
// 三項演算子（ ? : ）

const a = true;
let resultA;

if(a) {
  resultA = "true";
} else {
  resultA = "false";
}
console.log(resultA);

// function getResult() {
//   return a ? "true" : "false";
// }

// console.log(getResult());
```

+ `03_js_basic/070_conditional_operator/start/main.js`を編集<br>

```js:main.js
// 三項演算子（ ? : ）

const a = true;
let resultA = a ? "true" : "false";

console.log(resultA); // true

// function getResult() {
//   return a ? "true" : "false";
// }

// console.log(getResult());
```

+ `03_js_basic/070_conditional_operator/start/main.js`を編集<br>

```js:main.js
// 三項演算子（ ? : ）

const a = true;
let resultA = a ? 10 : -10;

console.log(resultA); // 10

// function getResult() {
//   return a ? "true" : "false";
// }

// console.log(getResult());
```

+ `03_js_basic/070_conditional_operator/start/main.js`を編集<br>

```js:main.js
// 三項演算子（ ? : ）

const a = true;

function getResult() {
  return a ? "true" : "false";
}

console.log(getResult()); // true
```

+ `03_js_basic/070_conditional_operator/start/main.js`を編集<br>

```js:main.js
// 三項演算子（ ? : ）

const a = 1;
let resultA = a ? 10 : -10;

console.log(resultA); // 10
```