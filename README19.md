## 104. 普遍性（immutability) [Part.2]

### イミュータブル（immutable）

書き換えが不可 (元の値は変わらない)<br>
`文字列、数値、bigInt、真偽値、undefined、シンボル` (プリミティブ型の値である)<br>

### ミュータブル（mutable）

書き換えが可能（元の値が変わる）
`イミュータブルな値以外。オブジェクト。（Object、Arrayなど）`<br>

## イミュータブル（immutable）な値の変更

```js:sample.js
let val = 0 // 数値

↓値の追加

val = 1 // 別で新しい 1という数値がメモリ空間に準備される
```

※ 変数の参照する先が変わっている<br>
  =>元の値を上書きしたことにならない。<br>
  =>imutable（変更不可の値）な値<br>

### ミュータブル（mutable）な値の変更

```js:sample.js
let val = [1, 2, 3] // 配列

↓配列の変更

val.push(4)
```

## ミュータブル（mutable）な値の変更

※ 変数の参照する先が変わらない。<br>
  =>配列の中身（元の値）が変わっている！<br>
  =>mutableな値（変更可能な値）<br>


## immutabilityの保持 (ミュータブルな値をイミュータブルのように扱う)

```js:sample.js
let val = [1, 2] // 配列

配列をコピーして値を変更↓

val = [...val, 3] // 別のメモリ空間に新しい配列が準備される
```

※ 変数の参照する先が変わっている！<br>
  =>元の値は変わらない！<br>
  =>immutabilityが保持されている。<br>

## 関数型プログラミングをImmutabilityの保持

+ ミュータブルなオブジェクトをイミュータブルとして取り扱う<br>

`[1, 2]`(元の値は変更しない！)<br>

↓ (インプット)<br>

```js:sample.js
      関数
function(val) {
  return [...val, 3]
}
```

↓（アウトプット）<br>

`[1, 2, 3]`（新しい配列！）<br>

## 105. Reactと純粋関数

+ `10_functional_programming/src/040_react_pure_fn/start/Example.js`を編集(1)<br>

```js:Example.js
let value = 0; // 関数の外の変数

const Child = () => {

}

const Example = () => {

  return (
    <>
    // 関数の外側で定義された変数を使用してはいけない
    <div>{value}</div>
    </>
  );
};

export default Example;
```

+ `10_functional_programming/src/040_react_pure_fn/start/Example.js`を編集(2)<br>

```js:Example.js
let value = 0

const Child = () => {
  value++ // 追加
  return <div>{value}</div> // 追加
}

const Example = () => {
  return (
    <>
      // 純粋関数というのは特定の引数には対しては必ず同じ戻り値を返さなければならないが。。。
      // 引数を指定していないのでそれぞれ違った戻り値を返してしまっている。
      // 大きいプロジェクトになるとバグがどこに混入しているのはわからなくなってしまう。
      // よってReactではこのようなコードは許可されていない
      <Child /> // 1
      <Child /> // 2
      <Child /> // 3
    </>
  )
}

export default Example
```

+ `10_functional_programming/src/040_react_pure_fn/start/Example.js`を編集(3 Reactの正しい書き方)<br>

```js:Example.js
let value = 0

const Child = () => {
  value++
  return <div>{value}</div>
}

// 追加
// propsを受け取ると純粋関数になる
const ChildPure = ({ value }) => {
  return <div>{value}</div>
}
// ここまで

const Example = () => {
  let value = 0

  return (
    <>
      <Child />
      <Child />
      <Child />
      // propsを渡すことによって同じ戻り値を渡せる
      <ChildPure value={++value} /> // 1
      <ChildPure value={++value} /> // 2
      <ChildPure value={++value} /> // 3
    </>
  )
}

export default Example
```

## 106. Reactにおける状態と処理の分離

+ `10_functional_programming/src/050_react_data_procedure/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

/*
状態管理と処理を分離
*/

// let val = 0 // 使用しない(関数の外の変数のため)

const Example = () => {
  // JSXを作成する場所
  const [ state, setState ] = useState(0);
  const increment = () => {
    setState(state + 1);
  }
  // window.alert('hello') // このような処理もReactでは行わない(副作用と呼ばれる useEffect()などを使って代用することとなる)

  return (
    <>
      <button onClick={increment}>+</button>
      <h3>{state}</h3>
    </>
  );
};

export default Example;
```
