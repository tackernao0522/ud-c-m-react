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
