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
