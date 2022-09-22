## 91. [useImperativeHandle] refへのアクセスを限定する方法 (あまり使わない方が良い)

+ `useImperativeHandle`は子コンポーネントで使用する<br>

+ `08_other_function/src/050_useImperativeHandle/start/Example.js`を編集<br>

```js:Example.js
import { useRef, forwardRef, useImperativeHandle } from 'react'

/* POINT forwardRef
子コンポーネント内の DOM に直接アクセスしたいときに使います。
refは、親から子コンポーネントへprops形式で渡して参照するということができないため、
参照したい場合は子コンポーネント内でfowardRefを使用する必要があります。
*/
const Input = forwardRef((props, ref) => {
  const inputRef = useRef() // 親から渡ってきたref とここのrefでは別物になる

  // 親から渡ってきたrefを第一引数に渡す
  useImperativeHandle(ref, () => ({
    myFocus() {
      inputRef.current.focus()
      console.log('フォーカス取得')
    },
  }))
  return <input type="text" ref={inputRef} />
})

const Example = () => {
  const ref = useRef()
  return (
    <>
      <Input ref={ref} />
      <button onClick={() => ref.current.myFocus()}>
        インプット要素をフォーカスする
      </button>
    </>
  )
}

export default Example
```

## 92. [練習&解答] refの使い方

+ `08_other_function/src/060_practice_ref/start/Example.js`を編集<br>

```js:Example.js
import { useState, useRef, forwardRef, useImperativeHandle } from 'react'

const Video = forwardRef(({ path }, ref) => {
  const videoRef = useRef()

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play()
    },
    stop() {
      videoRef.current.pause()
    },
  }))

  return (
    <video style={{ maxWidth: '100%' }} ref={videoRef}>
      <source src={path}></source>
    </video>
  )
})

const Example = () => {
  const [playing, setPlaying] = useState(false)

  const ref = useRef()

  return (
    <div>
      <h3>練習問題</h3>
      <p>
        useRef、useImperativeHandle、forwardRefを使って完成系の動画再生機能を作成してください。※useImperativeHandleでplay(再生)、stop(停止)メソッドを定義すること。
      </p>
      <Video ref={ref} path="./sample.mp4" />
      <button
        onClick={() => {
          if (playing) {
            ref.current.stop()
          } else {
            ref.current.play()
          }
          setPlaying((prev) => !prev)
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}

export default Example
```

# セクション9: 問題への対処法

## 95. エラーの解消方法

+ `エラー内容`<br>

```
Compiled with problems:X

ERROR in ./src/010_check_error/start/Example.js

Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: /Users/groovy/Documents/react-guide-material/09_debugging/src/010_check_error/start/Example.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (13:6)

  11 |   return (
  12 |       <p>現在のカウント数: {count}</p>
> 13 |       <button onClick={countUp}>+</button>
     |       ^
  14 |   );
  15 | };
  16 |
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  const countUp = () => {
    setCount((prevstate) => {
      prevstate.val += 1
      return prevstate
    })
  }

  return (
    <> // 追加
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>+</button>
    </> // 追加
  )
}

export default Example
```

+ `次のエラー内容`<br>

```
Compiled with problems:X

ERROR

[eslint]
src/010_check_error/start/Example.js
  Line 2:29:  'useState' is not defined  no-undef

Search for the keywords to learn more about each error.
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react" // 追加

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  const countUp = () => {
    setCount((prevstate) => {
      prevstate.val += 1
      return prevstate
    })
  }

  return (
    <>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `次のエラー内容`<br>

```
Error: Objects are not valid as a React child (found: object with keys {val}). If you meant to render a collection of children, use an array instead.


    at p
    at Example (http://localhost:3001/static/js/src_010_check_error_start_Example_js.chunk.js:30:76)
    at Suspense
    at BaseErrorBoundary (http://localhost:3001/static/js/bundle.js:222:5)
    at DynamicLoader (http://localhost:3001/static/js/bundle.js:34:5)
    at div
    at div
    at App (http://localhost:3001/static/js/bundle.js:71:5)
```

+ ブラウザーコンソールを開いて確認してみる<br>

```
Uncaught Error: Objects are not valid as a React child (found: object with keys {val}). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (react-dom.development.js:14887:1)
    at createChild (react-dom.development.js:15139:1)
    at reconcileChildrenArray (react-dom.development.js:15404:1)
    at reconcileChildFibers (react-dom.development.js:15821:1)
    at reconcileChildren (react-dom.development.js:19167:1)
    at updateHostComponent (react-dom.development.js:19924:1)
    at beginWork (react-dom.development.js:21618:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:4164:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js
    at invokeGuardedCallback (react-dom.development.js:4277:1)

    react_devtools_backend.js:4026 The above error occurred in the <p> component:

    at p
    at Example (http://localhost:3001/static/js/src_010_check_error_start_Example_js.chunk.js:30:76)
    at Suspense
    at BaseErrorBoundary (http://localhost:3001/static/js/bundle.js:222:5)
    at DynamicLoader (http://localhost:3001/static/js/bundle.js:34:5)
    at div
    at div
    at App (http://localhost:3001/static/js/bundle.js:71:5)

React will try to recreate this component tree from scratch using the error boundary you provided, BaseErrorBoundary.
```

+ まだこの状態だとカウントアップされない<br>

+ `09_debugging/src/010_check_error/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  const countUp = () => {
    console.log('button clicked') // 追加 '+'をクリックすると onClickイベントは反応しているが
    setCount((prevstate) => {
      prevstate.val += 1
      return prevstate
    })
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  const countUp = () => {
    // console.log('button clicked')
    setCount((prevstate) => {
      console.log('setCount clicked') // ここでも反応するのでsetCountのコールバック関数自体も問題なく動いていることがわかる
      prevstate.val += 1
      return prevstate
    })
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  const countUp = () => {
    // console.log('button clicked')
    setCount((prevstate) => {
      // console.log('setCount clicked')
      prevstate.val += 1
      console.log(prevstate) // prevstateの更新後の値を確認してみる 想定通りに動いているので更新自体も問題がなさそう
      return prevstate
    })
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  console.log('re-render') // 再レンダリングがちゃんと行われているかどうか確認 (行われていない様子)

  const countUp = () => {
    // console.log('button clicked')
    setCount((prevstate) => {
      // console.log('setCount clicked')
      prevstate.val += 1
      // console.log(prevstate)
      return prevstate
    })
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集(01)<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  console.log('re-render')

  const countUp = () => {
    // console.log('button clicked')
    // 編集
    setCount(() => {
      // console.log('setCount clicked')
      const newState = { ...count }
      newState.val += 1
      // console.log(prevstate)
      return newState
    })
    // ここまで
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `09_debugging/src/010_check_error/start/Example.js`を編集(02)<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  console.log('re-render')

  const countUp = () => {
    // console.log('button clicked')
    // 編集
    setCount((prevstate) => {
      // console.log('setCount clicked')
      const newState = { ...prevstate }
      newState.val += 1
      // console.log(prevstate)
      return newState
    })
    // ここまで
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ 再レンダリングが行われて正常に動くようになる<br>

+ `09_debugging/src/010_check_error/start/Example.js`を編集(03)<br>

```js:Example.js
import { useState } from "react"

const Example = () => {
  const [count, setCount] = useState({ val: 0 })

  console.log('re-render')

  const countUp = () => {
    // console.log('button clicked')
    setCount((prevstate) => {
      // console.log('setCount clicked')
      const newState = { val: prevstate.val + 1 } // { val:0 }のプロパティは一つだけなので これでもよい
      // newState.val += 1
      // console.log(prevstate)
      return newState
    })
  }

  return (
    <>
      <p>現在のカウント数: {count.val}</p>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```
