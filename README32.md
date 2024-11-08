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

+ useCallback() => コンポーネント内で定義した __関数__ をメモして再利用し、レンダリングの度に生成されることを防ぐ<br>
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

## 166. [React18] useTransitionでUIのパフォーマンス改善

__Concurrent Mode(React18 ★実験段階)__<br>

__concurrently: 同時に、並行してという意<br>
処理の優先順位付けを行うことで、より快適でレスポンシブな画面を作成するための機能<br>

__useTransition__<br>

__useDeferredValue__<br>

+ `15_performance/src/060_useTransition/start/Example.js`を編集<br>

```js:Example.js
import { useState, useTransition } from "react"; // 編集

const generateDummyItem = (num) => {
  return new Array(num).fill(null).map((item, index) => `item ${index}`);
};

const dummyItems = generateDummyItem(10000);

const Example = () => {
  const [isPending, startTransition] = useTransition() // 追加
  const [filterVal, setFilterVal] = useState("");

  const changeHandler = (e) => {
    setFilterVal(e.target.value);
  };

  return (
    <>
      <input type="text" onChange={changeHandler} />
      <ul>
        {dummyItems
          .filter((item) => {
            if (filterVal === "") return true;
            return item.includes(filterVal);
          })
          .map((item) => (
            <li key={item}>{item}</li>
          ))}
      </ul>
    </>
  );
};

export default Example;
```

+ `15_performance/src/060_useTransition/start/Example.js`を編集<br>

```js:Example.js
import { useState, useTransition } from 'react'

const generateDummyItem = (num) => {
  return new Array(num).fill(null).map((item, index) => `item ${index}`)
}

const dummyItems = generateDummyItem(10000)

const Example = () => {
  const [isPending, startTransition] = useTransition()
  const [filterVal, setFilterVal] = useState('')

  // 編集
  const changeHandler = (e) => {
    startTransition(() => {
      setFilterVal(e.target.value) // state更新の処理の優先順位が下がることになる
    })
  }
  // ここまで

  return (
    <>
      <input type="text" onChange={changeHandler} />
      <ul>
        {dummyItems
          .filter((item) => {
            if (filterVal === '') return true
            return item.includes(filterVal)
          })
          .map((item) => (
            <li key={item}>{item}</li>
          ))}
      </ul>
    </>
  )
}

export default Example
```

+ `15_performance/src/060_useTransition/start/Example.js`を編集<br>

```js:Example.js
import { useState, useTransition } from 'react'

const generateDummyItem = (num) => {
  return new Array(num).fill(null).map((item, index) => `item ${index}`)
}

const dummyItems = generateDummyItem(10000)

const Example = () => {
  const [isPending, startTransition] = useTransition()
  const [filterVal, setFilterVal] = useState('')

  const changeHandler = (e) => {
    startTransition(() => {
      setFilterVal(e.target.value) // state更新の処理の優先順位が下がることになる
    })
  }

  return (
    <>
      <input type="text" onChange={changeHandler} />
      {isPending && <div>Loading...</div>} // 追加
      <ul>
        {dummyItems
          .filter((item) => {
            if (filterVal === '') return true
            return item.includes(filterVal)
          })
          .map((item) => (
            <li key={item}>{item}</li>
          ))}
      </ul>
    </>
  )
}

export default Example
```

## 167. [React18] useDeferredValueでUIのパフォーマンス改善

+ `15_performance/src/070_useDeferredValue/start/Example.js`を編集<br>

```js:Example.js
import { useDeferredValue, useState } from 'react' // 編集

const generateDummyItem = (num) => {
  return new Array(num).fill(null).map((item, index) => `item ${index}`)
}

const dummyItems = generateDummyItem(10000)

const Example = () => {
  // const [isPending, startTransition] = useTransition(); // 削除
  const [filterVal, setFilterVal] = useState('')

  const changeHandler = (e) => {
    // 削除
    // startTransition(() => {
    //   setFilterVal(e.target.value);
    // })
    // ここまで
    setFilterVal(e.target.value) // 追加
  }

  // 追加
  const filteredItems = dummyItems
    .filter((item) => {
      if (filterVal === '') return true
      return item.includes(filterVal)
    })
    .map((item) => <li key={item}>{item}</li>)

  const deferredItems = useDeferredValue(filteredItems)
  // ここまで

  return (
    <>
      <input type="text" onChange={changeHandler} />
      {/* {isPending && <div>Loading...</div>} */}
      <ul>{deferredItems}</ul> // 編集
    </>
  )
}

export default Example
```
