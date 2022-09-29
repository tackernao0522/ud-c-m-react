# セクション11 : [React Hooks] 様々な状態管理の方法

## 111. useReducerを使ってみよう

+ `11_hooks_p1/src/010_useState_to_useReducer/start/Example.js`を編集(useStateで記述)<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)
  // const countUp = () => setState(state + 1)
  const countUp = () => setState(prev => ++prev)

  return (
    <>
      <h3>{state}</h3>
      <button onClick={countUp}>+</button>
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/010_useState_to_useReducer/start/Example.js`を編集(useReducerで記述)<br>

```js:Example.js
import { useReducer, useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)

  // rstateとstateの更新を個別でできるようになる
  // const [rstate, dispatch] = useReducer(state => state + 1, 0)
  const [rstate, dispatch] = useReducer((prev) => ++prev, 0) // 0が初期値
  // const countUp = () => setState(state => state + 1)
  const countUp = () => setState((prev) => ++prev) // ++prev は prev + 1 と同意?

  const rcountUp = () => {
    dispatch() // (prev) => ++prev が実行される
  }

  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
      </div>
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/010_useState_to_useReducer/start/Example.js`を編集(useReducerで記述)<br>

```js:Example.js
import { useReducer, useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)

  // rstateとstateの更新を個別でできるようになる
  // const [rstate, dispatch] = useReducer((state, action) => {
  //   if (action === '+') {
  //     return state + 1 // ++state
  //   } else if (action === '-') {
  //     return state - 1 // --state
  //   }
  // }, 0)
  // or
  const [rstate, dispatch] = useReducer((prev, action) => {
    if (action === '+') {
      return ++prev // prev + 1
    } else if (action === '-') {
      return --prev // prev + 1
    }
  }, 0)

  // const countUp = () => setState(state => state + 1)
  const countUp = () => setState((prev) => ++prev)

  const rcountUp = () => {
    dispatch('+')
  }

  const rcountDown = () => {
    dispatch('-')
  }

  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/010_useState_to_useReducer/start/Example.js`を編集(useReducerで記述 switch文)<br>

```js:Example.js
import { useReducer, useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)

  // rstateとstateの更新を個別でできるようになる
  // const [rstate, dispatch] = useReducer((state, action) => {
  //   if (action === '+') {
  //     return state + 1 // ++state
  //   } else if (action === '-') {
  //     return state - 1 // --state
  //   }
  // }, 0)

  const [rstate, dispatch] = useReducer((prev, action) => {
    switch (action) {
      case '+':
        return ++prev
      case '-':
        return --prev
      default:
        throw new Error('不明なアクションです。')
    }
    // if (action === '+') {
    //   return ++prev // prev + 1
    // } else if (action === '-') {
    //   return --prev // prev + 1
    // }
  }, 0)

  // const countUp = () => setState(state => state + 1)
  const countUp = () => setState((prev) => ++prev)

  const rcountUp = () => {
    dispatch('+')
  }

  const rcountDown = () => {
    dispatch('-')
  }

  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/010_useState_to_useReducer/start/Example.js`を編集(useReducerで記述 switch文 オブジェクトで指定)<br>

```js:Example.js
import { useReducer, useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)

  // rstateとstateの更新を個別でできるようになる
  // const [rstate, dispatch] = useReducer((state, action) => {
  //   if (action === '+') {
  //     return state + 1 // ++state
  //   } else if (action === '-') {
  //     return state - 1 // --state
  //   }
  // }, 0)

  const [rstate, dispatch] = useReducer((prev, { type }) => { // { type } にする
    switch (type) {
      case '+':
        return ++prev
      case '-':
        return --prev
      default:
        throw new Error('不明なアクションです。')
    }
    // if (action === '+') {
    //   return ++prev // prev + 1
    // } else if (action === '-') {
    //   return --prev // prev + 1
    // }
  }, 0)

  // const countUp = () => setState(state => state + 1)
  const countUp = () => setState((prev) => ++prev)

  const rcountUp = () => {
    dispatch({ type: "+" }) // オブジェクトにする
  }

  const rcountDown = () => {
    dispatch({ type: "-" }) // オブジェクトにする
  }

  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/010_useState_to_useReducer/start/Example.js`を編集(useReducerで記述 switch文 オブジェクトで指定 オプションを渡す)<br>

```js:Example.js
import { useReducer, useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)

  // rstateとstateの更新を個別でできるようになる
  // const [rstate, dispatch] = useReducer((state, action) => {
  //   if (action === '+') {
  //     return state + 1 // ++state
  //   } else if (action === '-') {
  //     return state - 1 // --state
  //   }
  // }, 0)

  const [rstate, dispatch] = useReducer((prev, { type, step }) => {
    switch (type) {
      case '+':
        return prev + step
      case '-':
        return prev - step
      default:
        throw new Error('不明なアクションです。')
    }
    // if (action === '+') {
    //   return ++prev // prev + 1
    // } else if (action === '-') {
    //   return --prev // prev + 1
    // }
  }, 0)

  // const countUp = () => setState(state => state + 1)
  const countUp = () => setState((prev) => ++prev)

  const rcountUp = () => {
    dispatch({ type: "+", step: 2 })
  }

  const rcountDown = () => {
    dispatch({ type: "-", step: 3 })
  }

  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  )
}

export default Example
```
