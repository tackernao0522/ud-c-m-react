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

## 112. useReducer と useStateの違い

+ `11_hooks_p1/src/020_useReducer_pros/start/Example.js`を編集<br>

```js:Example.js
import { useReducer, useState } from 'react'

// useState:状態の更新の仕方は利用側に託す。
// useReducer:状態の更新の仕方も状態側で担当する。

// 状態と処理の分離
// useState: コンポーネントで更新用の処理を保持
// useReducer: stateと一緒に更新用の処理を保持

// 純粋性（純粋関数）
// 特定の引数に特定の戻り値
const reducer = (prev, { type, step }) => {
  switch (type) {
    case '+':
      return prev + step
    case '-':
      return prev - step
    default:
      throw new Error('不明なactionです。')
  }
}

// 不変性（Immutability）
const Example = () => {
  const [state, setState] = useState(0)
  const [rstate, dispatch] = useReducer(reducer, 0)

  const step = 2
  const countUp = () => {
    setState((prev) => {
      return prev + step
    })
  }
  const rcountUp = () => {
    dispatch({ type: '+', step: 2 })
  }
  const rcountDown = () => {
    dispatch({ type: '-', step: 3 })
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

## 113. useReducer と useStateの違い(関数型プログラミング視点)

+ `11_hooks_p1/src/020_useReducer_pros/start/Example.js`を編集<br>

```js:Example.js
import { useReducer, useState } from 'react'

// useState:状態の更新の仕方は利用側に託す。
// useReducer:状態の更新の仕方も状態側で担当する。

// 状態と処理の分離
// useState: コンポーネントで更新用の処理を保持 簡単なプロジェクトなら良い
// useReducer: stateと一緒に更新用の処理を保持 大きいプロジェクトになると検討した方が良い

// 純粋性（純粋関数）純粋関数ではない場合はテストコードが書けなくなる
// 特定の引数に特定の戻り値
const reducer = (prev, { type, step }) => {
  switch (type) {
    case '+':
      return prev + step
    case '-':
      return prev - step
    default:
      throw new Error('不明なactionです。')
  }
}

// 不変性（Immutability）
const Example = () => {
  const [state, setState] = useState(0)
  const [rstate, dispatch] = useReducer(reducer, 0)

  const step = 2
  const countUp = () => {
    setState((prev) => {
      return prev + step // 純粋関数にならなくなる useStateの場合は純粋関数を保てなくなることがある
    })
  }
  const rcountUp = () => {
    dispatch({ type: '+', step: 2 })
  }
  const rcountDown = () => {
    dispatch({ type: '-', step: 3 })
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

## 114. [練習&解答] useReducer

+ `11_hools_p1/src/025_practice_useReducer/start/Example.js`を編集<br>

```js:Example.js
import { useReducer } from 'react'

const CALC_OPTIONS = ['add', 'minus', 'divide', 'multiply']

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  }

  const [state, dispatch] = useReducer(reducer, initState)

  const calculate = (e) => {}

  const numChangeHandler = (e) => {}

  return (
    <>
      <h3>練習問題</h3>
      <p>useReducerを使って完成コードと同じ機能を作成してください。</p>
      <div>
        a:
        <input
          type="number"
          name="a"
          value={state.a}
          onChange={numChangeHandler}
        />
      </div>
      <div>
        b:
        <input
          type="number"
          name="b"
          value={state.b}
          onChange={numChangeHandler}
        />
      </div>
      <select value={state.type} onChange={calculate}>
        // 追加
        {CALC_OPTIONS.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        // ここまで
      </select>
      <h1>結果：{state.result}</h1>
    </>
  )
}

export default Example
```

+ `11_hools_p1/src/025_practice_useReducer/start/Example.js`を編集<br>

```js:Example.js
import { useReducer } from 'react'

const CALC_OPTIONS = ['add', 'minus', 'divide', 'multiply']

// 編集
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'change':
      return { ...state, [payload.name]: state.a + state.b }
    case 'add':
      return { ...state, result: state.a + state.b }
    case 'minus':
      return { ...state, result: state.a - state.b }
    case 'divide':
      return { ...state, result: state.a / state.b }
    case 'multiply':
      return { ...state, result: state.a * state.b }
    default:
      throw new Error('不明なタイプです。')
  }
}
// ここまで

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  }

  const [state, dispatch] = useReducer(reducer, initState)

  // 編集
  const calculate = (e) => {
    dispatch({ type: e.target.value })
  }

  const numChangeHandler = (e) => {
    dispatch({
      type: 'change',
      payload: { name: e.target.name, value: e.target.value },
    })
  }
  // ここまで

  return (
    <>
      <h3>練習問題</h3>
      <p>useReducerを使って完成コードと同じ機能を作成してください。</p>
      <div>
        a:
        <input
          type="number"
          name="a"
          value={state.a}
          onChange={numChangeHandler}
        />
      </div>
      <div>
        b:
        <input
          type="number"
          name="b"
          value={state.b}
          onChange={numChangeHandler}
        />
      </div>
      <select onChange={calculate}> // 編集 stateの変更がないので value={state.type}はいらない
        {CALC_OPTIONS.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <h1>結果：{state.result}</h1>
    </>
  )
}

export default Example
```
