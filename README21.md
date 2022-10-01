## 115. useContextでグローバルな値を管理しよう

+ `11_hooks_p1/src/030_useContext/start/Example.js`を編集<br>

```js:Example.js
import Child from './components/Child'
import { createContext } from 'react' // 追加

const MyContext = createContext('hello') // 追加

const Example = () => {
  const value = 'hello'
  return <Child value={value} />
}

export default Example
```

↓(GrandChildに渡したい場合)<br>

+ `11_hooks_p1/src/030_useContext/start/Example.js`を編集<br>

```js:Example.js
import Child from './components/Child'
import { createContext } from 'react'

export const MyContext = createContext('hello') // exportをつける

const Example = () => {
  // const value = 'hello' // 削除
  return <Child /> // 編集
}

export default Example
```

+ `11_hooks_p1/src/030_useContext/start/components/GrandChild.js`を編集<br>

```js:GrandChild.js
import { useContext } from 'react' // 追加
import { MyContext } from '../Example' // 追加

const GrandChild = () => { // propsを削除
  const value = useContext(MyContext) // 追加

  return (
    <div style={{ border: '1px solid black' }}>
      <h3>孫コンポーネント</h3>
      {value}
    </div>
  )
}
export default GrandChild
```

+ `11_hooks_p1/src/030_useContext/start/components/Child.js`を編集<br>

```js:Child.js
import GrandChild from "./GrandChild";

const Child = () => ( // propsがいらなくなる
  <div style={{ border: "1px solid black", padding: 10 }}>
    <h3>子コンポーネント</h3>
    <GrandChild /> // 編集
  </div>
);

export default Child;
```

## 116. useContextでstateを管理してみよう

+ `11_hooks_p1/src/040_useContext_with_state/start/components/OtherChild.js`を編集<br>

```js:OtherChild.js
// import { useState } from "react"; // 削除

const OtherChild = () => {
  // const [ value, setValue ] = useState(0); // カット

  const clickHandler = (e) => {
    setValue((prev) => prev + 1);
  };

  return (
    <div>
      <h3>他の子コンポーネント</h3>
      <button onClick={clickHandler}>+</button>
      <h3>{value}</h3>
    </div>
  );
};

export default OtherChild;
```

+ `11_hooks_p1/src/040_useContext_with_state/start/Example.js`を編集<br>

```js:Example.js
import { createContext, useState } from 'react'
import Child from './components/Child'
import OtherChild from './components/OtherChild'
export const MyContext = createContext() // 編集

const Example = () => {
  const [value, setValue] = useState(0) // 追加

  return (
    <MyContext.Provider value={[value, setValue]}>
      <Child />
      <OtherChild />
    </MyContext.Provider>
  )
}

export default Example
```

+ `11_hooks_p1/src/040_useContext_with_state/start/components/OtherChild.js`を編集<br>

```js:OtherChild.js
import { useContext } from "react" // 追加
import { MyContext } from "../Example" // 追加

const OtherChild = () => {
  const [,setValue] = useContext(MyContext) // 追加

  const clickHandler = (e) => {
    setValue((prev) => prev + 1)
  }

  return (
    <div style={{ border: '1px solid black' }}>
      <h3>他の子コンポーネント</h3>
      <button onClick={clickHandler}>+</button>
      // <h3>{value}</h3> // 削除
    </div>
  )
}

export default OtherChild
```

+ `11_hooks_p1/src/040_useContext_with_state/start/components/GrandChild.js`を編集<br>

```js:GrandChild.js
import { useContext } from "react";
import { MyContext } from "../Example";
const GrandChild = () => {
  const [value] = useContext(MyContext); // 編集
  return (
    <div style={{ border: "1px solid black" }}>
      <h3>孫コンポーネント</h3>
      {value}
    </div>
  );
};
export default GrandChild;
```
