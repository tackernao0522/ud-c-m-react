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

## 31. [練習] JSX内で式を使ってみよう

+ `04_react_basic/src/087_practice_expr/start/Example.js`を編集<br>

```js:Example.js
const title = 'Expression';
const array = ['item1', 'item2', 'item3'];
const fn = (arg) => {
  return `${arg} Function`;
};
const upperCaseText = 'UpperCaseText';

const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードと同じ状態になるようにしてください。コンポーネントの外側（上部）に変数や関数を準備しているためうまく使ってください。※fragmentクラスの付与されたdivタグはfragmentを使用した記法に変更してください。
      </p>
      <h3>Hello JSX</h3>
      <h3>{upperCaseText.toUpperCase()}</h3>
      <h3>{`Hello ${title}`}</h3>
      <h3>{array}</h3>
      <h3>{fn('Hello')}</h3>
    </>
  );
};

export default Example;
```