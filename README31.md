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
