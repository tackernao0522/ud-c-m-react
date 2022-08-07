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

## 18. truthyな値、falsyな値について学ぼう

+ `03_js_basic/080_truthy_falsy/start/main.js`を編集<br>

```js:main.js
// falsy → 真偽値に変換した際に"偽(false)"とみなされる値のこと。
// truthy → それ以外

/* falsyな値の一覧
false
0 (数字)
0n (big int)
"" (空文字)
null
undefined
NaN (Not a Number)
*/

const a = 0;
let result = a ? 10 : -10;
console.log(result); // -10

const falsy = 0;
const truthy = 1;
console.log(Boolean(truthy)); // true
console.log(Boolean(falsy)); // false

// 論理積 (&&) について
const resultA = "" && "foo";
const resultB = 2 && 1 && 0 && 3;
const resultC = "foo" && 4;

// console.log(resultA);
// console.log(resultB);
// console.log(resultC);

// 理論和 (||) について
const resultD = "" || "foo";
const resultE = 0 || 2 || 0;
const resultF = "foo" || 4;

console.log(resultD);
console.log(resultE);
console.log(resultF);
```

+ `03_js_basic/080_truthy_falsy/start/main.js`を編集<br>

```js:main.js
// falsy → 真偽値に変換した際に"偽(false)"とみなされる値のこと。
// truthy → それ以外

/* falsyな値の一覧
false
0 (数字)
0n (big int)
"" (空文字)
null
undefined
NaN (Not a Number)
*/

// const a = 0;
// let result = a ? 10 : -10;
// console.log(result); // -10

// const falsy = 0;
// const truthy = 1;
// console.log(Boolean(truthy)); // true
// console.log(Boolean(falsy)); // false

// 論理積 (&&) について
const resultA = "" && "foo";
const resultB = 2 && 1 && 0 && 3;
const resultC = "foo" && 4;

console.log(resultA); // 空文字
console.log(resultB); // 0
console.log(resultC); // 4

// 理論和 (||) について
const resultD = "" || "foo";
const resultE = 0 || 2 || 0;
const resultF = "foo" || 4;

console.log(resultD); // foo
console.log(resultE); // 2
console.log(resultF); // foo
```

## 19. Promiseについて学ぼう

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
// 同期処理
let a = 0;
console.log(a); // 0
```

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
// 同期処理
let a = 0;
console.log(a); // 0

// 非同期処理 (順番通りに処理が行われないのを非同期処理)
setTimeout(() => {
  a = 1;
  console.log(a); // 1 一番後に出力されている(2秒後)
}, 2000);

console.log(a); // 0 値は変わらない(上書きされていない)
```

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
let a = 0;

// 非同期処理(Promise)
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1;
    resolve();
  }, 2000);
}).then(() => {
  console.log(a); // 1 (2秒後)
});
```

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
let a = 0;

// 非同期処理(Promise)
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1;
    resolve(a);
  }, 2000);
}).then((b) => {
  console.log(b); // 1 (2秒後)
});
```

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
let a = 0;

// 非同期処理(Promise)
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1;
    reject(a);
  }, 2000);
}).then((b) => {
  console.log(b); // 1 (2秒後)
}).catch(() => {
  console.log('catchが実行'); // catchが実行
});
```

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
let a = 0;

// 非同期処理(Promise)
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1;
    reject(a); // なんらかのエラーが発生した時に使うコールバックである
  }, 2000);
}).then((b) => {
  console.log(b); // 1 (2秒後)
}).catch((c) => {
  console.log('catchが実行', c); // catchが実行 1
});
```

+ `03_js_basic/090_promise/start/main.js`を編集<br>

```js:main.js
let a = 0;

// 非同期処理(Promise)
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1;
    resolve(a);
  }, 2000);
}).then((b) => {
  console.log(b); // 1 (2秒後)
  return b;
}).then((b) => {
  console.log(b); // 1
}).catch((c) => {
  console.log('catchが実行', c); // catchが実行 1
});
```

## 20. await/asyncの使い方について学ぼう

+ `03_js_basic/100_async_await/start/main.js`を編集<br>

```js:main.js
// 非同期処理（Promise）
let a = 0;

init(); // 0
function init() {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 1;
            resolve(a)
        }, 2000);
    })
        console.log(a); // 0 resolveが実行される前にcondole.log(a);が実行されてしまう(thenがないので) 0になる
    // }).catch((c) => {
    //     console.log('catchが実行', c)
    // })
}
```

+ `03_js_basic/100_async_await/start/main.js`を編集<br>

```js:main.js
// 非同期処理（Promise）
let a = 0;

init(); // 0
async function init() {
    // async/awaitはresolve が実行されるまで待っているよってconsole.log(a); は 1と出力される
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 1;
            resolve(a)
        }, 2000);
    })
        console.log(a); // 1
    // }).catch((c) => {
    //     console.log('catchが実行', c)
    // })
}
```

+ `03_js_basic/100_async_await/start/main.js`を編集<br>

```js:main.js
// 非同期処理（Promise）
let a = 0;

init(); // 1
async function init() {
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 1;
            resolve(a)
        }, 2000);
    })
        console.log(result); // 1
    // }).catch((c) => {
    //     console.log('catchが実行', c)
    // })
}
```

+ `03_js_basic/100_async_await/start/main.js`を編集<br>

```js:main.js
// 非同期処理（Promise）
let a = 0;

init(); // catchが実行 1
async function init() {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                a = 1;
                reject(a)
            }, 2000);
        })
        console.log(result);
    } catch (e) {
        console.log('catchが実行', e); // catchが実行 1
    }
    // }).catch((c) => {
    //     console.log('catchが実行', c)
    // })
}
```

+ `03_js_basic/100_async_await/start/main.js`を編集<br>

```js:main.js
// 非同期処理（Promise）
let a = 0;

init(); // catchが実行 1
async function init() {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                a = 1;
                reject(a)
            }, 2000);
        })
        console.log(result);
    } catch (e) {
        console.log('catchが実行', e); // catchが実行 1
    }
}
```
