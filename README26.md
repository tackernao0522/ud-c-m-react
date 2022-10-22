## 131. useEffectの実行順を意識して実装してみよう

+ `12_hooks_p2/src/060_useEffect_click/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState, useLayoutEffect } from 'react'

const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>
        {isDisp ? '非表示' : '表示'} // 編集
      </button>
    </>
  )
}

const Timer = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    // console.log('init');
    let intervalId = null
    intervalId = window.setInterval(() => {
      // console.log('interval running');
      setTime((prev) => prev + 1)
    }, 1000)
    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [])

  useEffect(() => {
    // console.log('updated');

    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // console.log('updated end');
    }
  }, [time])

  useLayoutEffect(() => {
    const _time = parseInt(window.localStorage.getItem('time-key'))
    if (!isNaN(_time)) {
      setTime(_time)
    }
  }, [])

  return (
    // 編集
    <>
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <div>
        <button>スタート</button>
        <button>リセット</button>
      </div>
    </>
    // ここまで
  )
}

export default Example
```

+ `12_hooks_p2/src/060_useEffect_click/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState, useLayoutEffect } from 'react'

const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>
        {isDisp ? '非表示' : '表示'}
      </button>
    </>
  )
}

const Timer = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    // console.log('init');
    let intervalId = null
    intervalId = window.setInterval(() => {
      // console.log('interval running');
      setTime((prev) => prev + 1)
    }, 1000)
    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [])

  useEffect(() => {
    // console.log('updated');

    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // console.log('updated end');
    }
  }, [time])

  useLayoutEffect(() => {
    const _time = parseInt(window.localStorage.getItem('time-key'))
    if (!isNaN(_time)) {
      setTime(_time)
    }
  }, [])

  // 追加
  const toggle = () => {

  }

  const reset = () => {

  }
  // ここまで

  return (
    <>
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <div>
        <button onClick={toggle}>スタート</button> // 編集
        <button onClick={reset}>リセット</button> // 編集
      </div>
    </>
  )
}

export default Example
```

+ `12_hooks_p2/src/060_useEffect_click/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState, useLayoutEffect } from 'react'

const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>
        {isDisp ? '非表示' : '表示'}
      </button>
    </>
  )
}

const Timer = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false) // 追加

  useEffect(() => {
    // console.log('init');
    let intervalId = null
    // 編集
    if (isRunning) {
      intervalId = window.setInterval(() => {
        // console.log('interval running');
        setTime((prev) => prev + 1)
      }, 1000)
    }
    // ここまで
    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [isRunning])

  useEffect(() => {
    // console.log('updated');

    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // console.log('updated end');
    }
  }, [time])

  useLayoutEffect(() => {
    const _time = parseInt(window.localStorage.getItem('time-key'))
    if (!isNaN(_time)) {
      setTime(_time)
    }
  }, [])

  const toggle = () => {
    setIsRunning((prev) => !prev) // 編集
  }

  const reset = () => {}

  return (
    <>
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <div>
        <button onClick={toggle}>{isRunning ? '一時停止' : 'スタート'}</button>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

+ `12_hooks_p2/src/060_useEffect_click/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState, useLayoutEffect } from 'react'

const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>
        {isDisp ? '非表示' : '表示'}
      </button>
    </>
  )
}

const Timer = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // console.log('init');
    let intervalId = null
    if (isRunning) {
      intervalId = window.setInterval(() => {
        // console.log('interval running');
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [isRunning])

  useEffect(() => {
    // console.log('updated');

    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // console.log('updated end');
    }
  }, [time])

  useLayoutEffect(() => {
    const _time = parseInt(window.localStorage.getItem('time-key'))
    if (!isNaN(_time)) {
      setTime(_time)
    }
  }, [])

  const toggle = () => {
    setIsRunning((prev) => !prev)
  }

  const reset = () => {
    setTime(0) // 追加
    setIsRunning(false) // 追加
  }

  return (
    <>
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <div>
        <button onClick={toggle}>{isRunning ? '一時停止' : 'スタート'}</button>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

+ コメントアウトしている`console.log`を解放して確認してみる<br>

## 132. 独自のフックを作成してみよう

### カスタムフック(Custom Hook)

useStateなどのReact Hookを内部でしようした関数(フック)のこと。(＊関数名は`use○○`をする！)<br>
↓
React Hookを関数に切り出すことで再利用できる！<br>

+ `12_hooks_p2/src/070_customHook/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState, useLayoutEffect } from 'react'

const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>
        {isDisp ? '非表示' : '表示'}
      </button>
    </>
  )
}

const Timer = () => {
  // ここからカット
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // console.log('init');
    let intervalId = null

    if (isRunning) {
      // console.log('timer start');

      intervalId = window.setInterval(() => {
        // console.log('interval running');
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [isRunning])

  useEffect(() => {
    // // console.log('updated');

    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // // console.log('updated end');
    }
  }, [time])

  useLayoutEffect(() => {
    const _time = parseInt(window.localStorage.getItem('time-key'))
    if (!isNaN(_time)) {
      setTime(_time)
    }
  }, [])

  const toggle = () => {
    setIsRunning((prev) => !prev)
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
  }
  // ここまでカット

  return (
    <>
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <div>
        <button onClick={toggle}>{isRunning ? '一時停止' : 'スタート'}</button>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

+ `$ touch 070_customHook/start/useTimer.jsx`を実行<br>

+ `touch 070_customHook/start/useTimer.jsx`を編集<br>

```jsx:useTimer.jsx
import { useEffect, useLayoutEffect, useState } from 'react'

const useTimer = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // console.log('init');
    let intervalId = null

    if (isRunning) {
      // console.log('timer start');

      intervalId = window.setInterval(() => {
        // console.log('interval running');
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [isRunning])

  useEffect(() => {
    // // console.log('updated');

    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // // console.log('updated end');
    }
  }, [time])

  useLayoutEffect(() => {
    const _time = parseInt(window.localStorage.getItem('time-key'))
    if (!isNaN(_time)) {
      setTime(_time)
    }
  }, [])

  const toggle = () => {
    setIsRunning((prev) => !prev)
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
  }

  return {
    time,
    isRunning,
    toggle, // toggle: toggleの省略形
    reset,
  }
}

export default useTimer
```

+ `12_hooks_p2/src/070_customHook/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react' // 編集
import useTimer from './useTimer' // 追加

const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>
        {isDisp ? '非表示' : '表示'}
      </button>
    </>
  )
}

const Timer = () => {
  const { time, isRunning, toggle, reset } = useTimer() // 追加

  return (
    <>
      <h3>
        <time>{time}</time>
        <span>秒経過</span>
      </h3>
      <div>
        <button onClick={toggle}>{isRunning ? '一時停止' : 'スタート'}</button>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
```

## 133. [練習&解答] Custom Hook

+ `$ touch 075_practice_customHook/start/hooks.js`を実行<br>

+ `touch 075_practice_customHook/start/hooks.js`を編集<br>

```js:hooks.js
import { useState } from 'react'

const useCount = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count => count + 1)
  }

  return {
    count,
    countUp,
  }
}

export default useCount
```

+ `12_hooks_p2/src/075_practice_customHook/start/Example.js`を編集<br>

```js:Exaample.js
import useCount from './hooks'

const Example = () => {
  const { count, countUp } = useCount() // 追加

  return (
    <>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードと同じ状態になるようにしてください。
        startフォルダの中にhooks.jsというファイルを作成しその中でuseCountというカスタムフックを作成してください。
      </p>
      <div>Counts: {count}</div> // 編集
      <button onClick={countUp}>Count Up!</button> // 編集
    </>
  )
}

export default Example
```

## 134. [発展] 関数型プログラミングから見たuseEffectの使用ケース

### useEffect と 副作用<br>

#### 関数型プログラミングの重要なキーワード(おさらい)

+ (値の) 状態管理と処理を分離: 状態と処理は切り離す<br>

+ 純粋関数 (副作用を排除する): 特定の入力には特定の出力を返す<br>

+ 普変性 (Immutability): 一度設定した値は書き換えない<br>

#### 純粋関数と副作用(Side Effect)

##### 純粋関数

  + 関数の出力 (戻り値)が、提供される入力値 (引数)のみに依存する。<br>

  + 外部スコープの状態 (データ) は参照しない・変更しない。<br>

  + 引数で渡された値を変更しない。<br>

  + 関数外に影響を及ぼさない。<br>

  `＊` 上記の要件を満たさない操作は`副作用`と呼ばれる。<br>

#### Reactにおける副作用(Side Effect)

コンポーネントはJSXを構築する場所。<br>
JSXの構築に"直接"関係のない処理は全て`副作用`をして扱われる。<br>

`副作用の例`<br>
コンソールへのログ出力<br>
DOM操作<br>
サーバーとの通信<br>
タイマー処理<br>
ランダムな値の生成<br>

↓<br>

```
       useEffect
          or
  イベントハンドラ内に記述
```
