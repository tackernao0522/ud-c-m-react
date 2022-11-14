# セクション15: [発展] パフォーマンスの最適化

## 157. [レンダリング] 画面が更新されるまで

### Reactが画面を更新する流れ

+ __トリガー__ : 何らかの契機にレンダリングを予約すること<br>

↓<br>

+ __レンダリング__ : コンポーネントを実行すること<br>

↓<br>

+ __コミット__ : DOM値の更新を行右こと<br>

### レンダリングがトリガーされるタイミング

1. __初回レンダリング__<br>
    ルートコンポーネントをHTML(DOM)にマウントした時<br>
    `<div id="app"></div> <= root.render(<App />);`<br>

2. __"state"の値が変更されたとき__<br>
    コンポーネントのstateの値が変更された時<br>
    `＊` 基本的にはstateの前後の値に差が生じた際にレンダリングがスケジュールされる<br>

### stateの比較

__"更新用関数で渡された値①"と"保持している値②"を比較__<br>

```jsx:Sample.jsx
const Example = () => {

  let [val, setVal] = useState();
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setVal(e.target.value); // 更新用関数でstateに新しい値を渡す。
        }}
      />
      = {val}
    </>
  )
}
```

### stateの変更前後で値が同じ時も再レンダリングが発生することはある

#### state 更新の回避

現在値と同じ値で更新を行った場合、Reactは子のレンダーや副作用の実行を回避して処理を終了します。<br>

__更新の回避が起きる前にReactにとり該当のコンポーネント自体はレンダーされるかもしれない、ということに注意してください。__<br>
ツリーのそれ以上「深く」にまで処理は及ばないためこれは問題ではないはずです。<br>
もしレンダー中にコストの高い計算を行っている場合は `useMemo`を使った最適化が可能です。<br>

(参考) [React公式（state更新の回避)](https://ja.reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update) <br>

### レンダリング

__Reactは(関数)コンポーネントを実行すること__<br>

↓<br>

stateの変更によってコンポーネントが__再実行__されることを__再レンダリング__と呼ぶ！<br>


### コミット

__再レンダリング の結果、ReactがReact要素の差分のみをDOMに反映する__<br>

## 158. Stateの比較処理 (Object.is)

[動画参照](https://www.udemy.com/course/react-complete-guide/learn/lecture/33043846#questions)<br>

## 159. [TIPS] StrictModeとは？

+ `15_performance/src/012_strictmode/start/Example.js`を編集<br>

```js:Example.js
import { StrictMode, useState } from 'react' // 編集
import './Example.css'

// 追加
const StrictComp = () => {
  return (
    <StrictMode>
      <Example />
    </StrictMode>
  )
}
// ここまで

const Example = () => {
  console.log('render')

  const [countA, setCountA] = useState({
    val: 0,
  })

  const obj1 = { val: 0 }
  const obj3 = { val: 0 }
  const obj2 = { ...obj1 }
  const isSame = Object.is('', false)
  const isSameEqual = '' == false
  console.log(isSameEqual)

  return (
    <div className="parent">
      <div>
        <h3>再レンダリング？</h3>
        <button
          onClick={() => {
            setCountA((prev) => {
              const newState = { ...prev }
              // prev.val = 1;
              return newState
            })
          }}
        >
          ボタンA
        </button>
      </div>
      <div>
        <p>ボタンAクリック回数：{countA.val}</p>
      </div>
    </div>
  )
}

export default StrictComp // 編集
```

#### 本番環境用にビルドしてみる<br>

+ `$ npm run build`を実行<br>

+ 生成された`build`フォルダを新規のVSコードで起動して、`Go Live`を起動する<br>

+ 本番用ではStrictModeでも一度のみしか際レンダリングされなくなる。<br>

## 160. 子コンポーネントの不要なレンダリング

+ `$ touch 15_performance/src/015_child_rerender/start/Child.js`を実行<br>

+ `015_child_rerender/start/Child.js`を編集<br>

```js:Child.js
const Child = ({ countB }) => {
  console.log('%cChild render', 'color: red')
  return (
    <div className="child">
      <h3>子コンポーネント領域</h3>
      <p>ボタンBクリック回数：{countB}</p>
    </div>
  )
}

export default Child
```

+ `15_performance/src/015_child_rerender/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import '../end/Example.css'
import Child from './Child'

const Example = () => {
  console.log('Parent render')
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)
  return (
    <>
      <h3>再レンダリング</h3>
      <p>
        親コンポーネントが再レンダリングされると子コンポーネントも再レンダリングされる
      </p>
      <p>コンソールを要確認</p>
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
          <div>
            <button
              onClick={() => {
                setCountB((pre) => pre + 1)
              }}
            >
              ボタンB
            </button>
            <span>子のpropsに渡すstateを更新</span>
          </div>
        </div>
        <div>
          <p>ボタンAクリック回数：{countA}</p>
        </div>
        <Child countB={countB} />
      </div>
    </>
  )
}

export default Example
```

## 161. React.memoを使った不要なレンダリングの防止

+ `$ touch 15_performance/src/020_memo/start/Child.js`を実行<br>

+ `020_memo/start/Child.js`を編集<br>

```js:Child.js
import { memo } from 'react'

function areEqual(prevProps, nextProps) {
  // * 逆にすると逆の結果になる
  if (prevProps.countB !== nextProps.countB) {
    return false // 再レンダリング
  } else {
    return true // 再レンダリング発生なし
  }
  /*
  nextPropsをrenderに渡した結果が
  prevPropsをrenderに渡した結果となる時にtrueを返し
  それイア外の時にfalseを返す
  */
}

const ChildMemo = memo(({ countB }) => {
  console.log('%cChild render', 'color: red;')

  return (
    <div className="child">
      <h2>子コンポーネント領域</h2>
      <span>ボタンBクリック回数：{countB}</span>
    </div>
  )
}, areEqual)

export default ChildMemo
```

+ `15_performance/src/020_memo/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import '../end/Example.css'
import ChildMemo from './Child'

const Example = () => {
  console.log('Parent render')
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)
  return (
    <div className="parent">
      <h3>React.memoで子コンポーネントの再レンダリングを防止</h3>
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
        <div>
          <button
            onClick={() => {
              setCountB((pre) => pre + 1)
            }}
          >
            ボタンB
          </button>
          <span>子のpropsに渡すstateを更新</span>
        </div>
      </div>
      <div>
        <p>ボタンAクリック回数：{countA}</p>
      </div>
      <ChildMemo countB={countB} />
    </div>
  )
}

export default Example
```

## 162. useCallbackを使った関数のメモ化

+ `15_performance/src/030_useCallback/start/Example.js`を編集(ボタンBの部分を子コンポーネントにする)<br>

```js:Example.js
import React, { useState } from 'react'
import Child from './Child'
import '../end/Example.css'

const Example = () => {
  console.log('Parent render')

  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)

  const clickHandler = () => {
    setCountB((pre) => pre + 1)
  }

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

+ `15_performance/src/030_useCallback/start/Child.js`を編集<br>

```js:Child.js
import { memo } from 'react'

const ChildMemo = memo(({ countB, onClick }) => {
  console.log('%cChild render', 'color: red;')

  return (
    <div className="child">
      <h2>子コンポーネント領域</h2>
      <div>
        <button onClick={onClick}>ボタンB</button>
        <span>子のpropsに渡すstateを更新</span>
      </div>
      <span>ボタンBクリック回数：{countB}</span>
    </div>
  )
})

export default ChildMemo
```

+ 現時点ではAボタンを押してる時に子コンポーネントも再レンダリングされてしまう。<br>
  それはclickHandlerという関数が親コンポーネントに定義されているのでAボタンをそう都度に子コンポーネントが再レンダリング されてしまう。<br>
  clickHandeler関数は実行される度に別物と判断される為です。なのでmemoは効かない。<br>
  それを対処する為に`useCallback()`を使用する。<br>
  それを確認するために下記のコードを`Example.js`に記述してみる。<br>

+ `15_performance/src/030_useCallback/start/Example.js`に確認コード<br>

```js:Example.js
import React, { useState } from 'react'
import Child from './Child'
import '../end/Example.css'

const Example = () => {
  console.log('Parent render')

  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)

  const clickHandler = () => {
    setCountB((pre) => pre + 1)
  }
  // 追加
  const clickHandler2 = () => {
    setCountB((pre) => pre + 1)
  }

  console.log(Object.is(clickHandler, clickHandler2)) // falseになるので別物である(そのためにmemoが効かない)
  // ここまで

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

+ `15_performance/src/030_useCallback/start/Example.js`を編集<br>

```js:Example.js
import React, { useCallback, useState } from 'react'
import Child from './Child'
import '../end/Example.css'

const Example = () => {
  console.log('Parent render')

  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)

  // 編集
  const clickHandler = useCallback(() => {
    setCountB((pre) => pre + 1)
  }, [])
  // ここまで

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
