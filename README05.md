## 30. [TIPS] 式と文の違い

※ 式はJSX内で使用できる(変数に代入できるもの)<br>

※ 文はJSX内で使用できない<br>

+ `04_react_basic/src/085_expr_and_state/start/components/Child.js`を編集<br>

```js:Child.js
/* POINT 式と文
式：何らかの値を返すもの（変数に代入できるもの）
文：変数宣言、for文、if文、switch文やセミコロンで区切るもの。
*/

import "./Child.css";

const Child = () => {
  const a = 1; // 式
  return (
    <div className="component">
      <h3>式と文</h3>
      {1}
    </div>
  );
};

export default Child;
```

+ `04_react_basic/src/085_expr_and_state/start/components/Child.js`を編集<br>

```js:Child.js
/* POINT 式と文
式：何らかの値を返すもの（変数に代入できるもの）
文：変数宣言、for文、if文、switch文やセミコロンで区切るもの。
*/

import "./Child.css";

const Child = () => {
  const a = 1 === 1;
  console.log(1 === 1); // true
  return (
    <div className="component">
      <h3>式と文</h3>
      {1 === 1} // booleanは表示されない
    </div>
  );
};

export default Child;
```

+ `04_react_basic/src/085_expr_and_state/start/components/Child.js`を編集<br>

```js:Child.js
/* POINT 式と文
式：何らかの値を返すもの（変数に代入できるもの）
文：変数宣言、for文、if文、switch文やセミコロンで区切るもの。
*/

import "./Child.css";

const Child = () => {
  // eslint-disable-next-line no-unused-vars
  const a = true ? 'hello' : 'bye';
  // eslint-disable-next-line no-self-compare
  console.log(1 === 1);
  return (
    <div className="component">
      <h3>式と文</h3>
      {true ? 'hello' : 'bye'} // 式になるので使用可能
    </div>
  );
};

export default Child;
```

+ `04_react_basic/src/085_expr_and_state/start/components/Child.js`を編集<br>

```js:Child.js
/* POINT 式と文
式：何らかの値を返すもの（変数に代入できるもの）
文：変数宣言、for文、if文、switch文やセミコロンで区切るもの。
*/

import "./Child.css";

const Child = () => {
  // eslint-disable-next-line no-unused-vars
  const a = true ? 'hello' : 'bye';
  // eslint-disable-next-line no-self-compare
  console.log(1 === 1);
  return (
    <div className="component">
      <h3>式と文</h3>
      {false ? 'hello' : 'bye'}
    </div>
  );
};

export default Child;
```

+ `04_react_basic/src/085_expr_and_state/start/components/Child.js`を編集<br>

```js:Child.js
/* POINT 式と文
式：何らかの値を返すもの（変数に代入できるもの）
文：変数宣言、for文、if文、switch文やセミコロンで区切るもの。
*/

import "./Child.css";

const Child = () => {
  const hello = () => 'hello';
  const a = hello();
  return (
    <div className="component">
      <h3>式と文</h3>
      {a}
    </div>
  );
};

export default Child;
```
