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
