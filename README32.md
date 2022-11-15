## 164. useMemoを使った値のメモ化

__useMemoとReact.memoの違い__<br>

useMemo: 値をメモ化<br>

React.memo: コンポーネントをメモ化<br>

+ `15_performance/src/050_useMemo/start/Child.js`を編集<br>

```js:Child.js
import React, { useMemo } from 'react'

// 編集
const Child = ({ countB, onClick }) => {
  console.log('%cChild render', 'color: red;')

  return useMemo(() => {
    console.log("%cuseMemo", "color: green;");
    return (
      <div className="child">
        <h2>子コンポーネント領域</h2>
        <button onClick={onClick}>ボタンB</button>
        <p>ボタンBクリック回数：{countB}</p>
      </div>
    )
  }, [countB])
}
// ここまで

export default Child
```

+ `15_performance/src/050_useMemo/start/Child.js`を編集<br>

```js:Child.js
import React, { useMemo } from 'react'

const Child = ({ countB, onClick }) => {
  console.log('%cChild render', 'color: red;')

  return useMemo(() => {
    console.log("%cuseMemo", "color: green;");
    return (
      <div className="child">
        <h2>子コンポーネント領域</h2>
        <button onClick={onClick}>ボタンB</button>
        {/* <p>ボタンBクリック回数：{countB}</p> */} // 一旦コメントアウト
      </div>
    )
  }, [onClick]) // 編集
}

export default Child
```

+ `15_performance/src/050_useMemo/start/Example.js`を編集<br>

```js:Example.js
import React, { useCallback, useState } from 'react'
import Child from './Child'

const Example = () => {
  console.log('Parent render')
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)

  const clickHandler = useCallback(() => {
    console.log('countB', countB) // 追加
    setCountB(countB + 1) // countB + 1という書き方をした場合は依存配列を入れる必要がある。
  }, [countB])

  return (
    <div className="parent">
      <div>
        <h3>親コンポーネント領域</h3>
        <div>
          <button
            onClick={() => {
              setCountA((pre) => pre + 1)
            }}
          >
            ボタンA
          </button>
          <span>親のstateを更新</span>
        </div>
      </div>
      <div>
        <p>ボタンAクリック回数：{countA}</p>
      </div>
      <Child countB={countB} onClick={clickHandler} />
    </div>
  )
}

export default Example
```

## 165. セクションまとめ

### 再レンダリングを防ぐための関数

+ React.memo() => 受け取ったpropsの値が同じであれば再レンダリングをスキップ<br>

+ useCallback() => コンポーネント内で定義した__関数__をメモして再利用し、レンダリングの度に生成されることを防ぐ<br>
  => 子コンポーネントに関数を渡している場合に、 __不要な再レンダリングを防ぐ__ ことができる。<br>

+ useMemo() => コンポーネントだけでなく値をメモすることが可能。コストの高い処理などをメモ化する。<br>
  => useMemo自体の実行にもコストがかかるため、重い処理にのみ使用すること。<br>

### 関数がpropsにわたる場合

  __コンポーネント内で定義した関数は再レンダリングのたびに再生成される。__<br>

+ `コンポーネントA`<br>

```jsx:Sample.jsx
const handleClick = () => { ... }
```

props : { onSmash : handleClick }<br>

↑<br>
__再レンダリング前後で__コンポーネントA（再レンダリング) 異なる関数！<br>
↓<br>

```jsx:Sample.jsx
const handleClick = () => { ... }
```

props : { onSmash : handleClick }<br>

↓<br>

__子コンポーネントに渡されるpropsに変更あったとみなされる！__<br>

↓<br>

React.memoだけでは再レンダリングを防げない<br>

このような時は`useCallback()`を使用する<br>
