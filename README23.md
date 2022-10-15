## 120. [練習&解答] useContextとuseReducer

+ `$ mkdir 070_practice_useContext/src/components && touch $_/Input.jsx`を実行<br>

+ `$ mkdir src/070_practice_useContext/start/components/context`を実行<br>

+ `11_hooks_p1/src/070_practice_useContext/start/components/Input.jsx`を編集<br>

```jsx:Input.jsx
const Input = ({ name }) => {
  const numChangeHandler = (e) => {
    dispatch({
      type: 'change',
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  return (
    <div>
      {name}:
      <input
        type="number"
        name={name}
        value={state[name]}
        onChange={numChangeHandler}
      />
    </div>
  )
}

export default Input
```

+ `11_hooks_p1/src/070_practice_useContext/start/Example.js`を編集<br>

```js:Example.js
import { useReducer } from 'react'
import Input from './components/Input' // 追加

const CALC_OPTIONS = ['add', 'minus', 'divide', 'multiply'] // カット

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'change': {
      const { name, value } = payload
      return { ...state, [name]: value }
    }
    case 'add': {
      return { ...state, result: state.a + state.b }
    }
    case 'minus': {
      return { ...state, result: state.a - state.b }
    }
    case 'divide': {
      return { ...state, result: state.a / state.b }
    }
    case 'multiply': {
      return { ...state, result: state.a * state.b }
    }
    default:
      throw new Error('operator is invalid')
  }
}

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  }

  const [state, dispatch] = useReducer(reducer, initState)

  // ここから
  const calculate = (e) => {
    dispatch({ type: e.target.value })
  }
  // ここまでカット

  return (
    /* 完成系のJSX */
    // <CalcProvider>
    //   <Input name="a"/>
    //   <Input name="b" />
    //   <Select />
    //   <Result />
    // </CalcProvider>
    <>
      <h3>練習問題</h3>
      <p>
        Example内のコードをコンポーネントに分割してください。また、ステートはContext経由でやり取りしてください。
      </p>
      <Input name="a" /> // 編集
      <Input name="b" /> // 編集
      // ここからカット
      <select value={state.type} name="type" onChange={calculate}>
        {CALC_OPTIONS.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      // ここまでカット
      <h3>結果：{state.result}</h3>
    </>
  )
}

export default Example
```

+ `$ touch src/070_practice_useContext/start/components/Select.jsx`を実行<br>

+ `$ src/070_practice_useContext/start/components/Select.jsx`を編集<br>

```jsx:Select.jsx
const CALC_OPTIONS = ['add', 'minus', 'divide', 'multiply']

const Select = () => {
  const calculate = (e) => {
    dispatch({ type: e.target.value })
  }

  return (
    <select value={state.type} name="type" onChange={calculate}>
      {CALC_OPTIONS.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}

export default Select
```

+ `11_hooks_p1/src/070_practice_useContext/start/Example.js`を編集<br>

```js:Example.js
import { useReducer } from 'react'
import Input from './components/Input'
import Select from './components/Select'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'change': {
      const { name, value } = payload
      return { ...state, [name]: value }
    }
    case 'add': {
      return { ...state, result: state.a + state.b }
    }
    case 'minus': {
      return { ...state, result: state.a - state.b }
    }
    case 'divide': {
      return { ...state, result: state.a / state.b }
    }
    case 'multiply': {
      return { ...state, result: state.a * state.b }
    }
    default:
      throw new Error('operator is invalid')
  }
}

const Example = () => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  }

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    /* 完成系のJSX */
    // <CalcProvider>
    //   <Input name="a"/>
    //   <Input name="b" />
    //   <Select />
    //   <Result />
    // </CalcProvider>
    <>
      <h3>練習問題</h3>
      <p>
        Example内のコードをコンポーネントに分割してください。また、ステートはContext経由でやり取りしてください。
      </p>
      <Input name="a" />
      <Input name="b" />
      <Select />
      <h3>結果：{state.result}</h3> // カットしておく
    </>
  )
}

export default Example
```

+ `$ touch src/070_practice_useContext/start/components/Result.jsx`を実行<br>

+ `src/070_practice_useContext/start/components/Result.jsx`を編集<br>

```jsx:Result.jsx
const Result = () => {
  return <h3>結果：{state.result}</h3>
}

export default Result
```

+ `11_hooks_p1/src/070_practice_useContext/start/Example.js`を編集<br>

```js:Example.js
import { useReducer } from 'react'
import Input from './components/Input'
import Result from './components/Result' // 追加
import Select from './components/Select'

// ここから
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'change': {
      const { name, value } = payload
      return { ...state, [name]: value }
    }
    case 'add': {
      return { ...state, result: state.a + state.b }
    }
    case 'minus': {
      return { ...state, result: state.a - state.b }
    }
    case 'divide': {
      return { ...state, result: state.a / state.b }
    }
    case 'multiply': {
      return { ...state, result: state.a * state.b }
    }
    default:
      throw new Error('operator is invalid')
  }
}
// ここまでカット

const Example = () => {
  // ここから
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  }

  const [state, dispatch] = useReducer(reducer, initState)
  // ここまでカット

  return (
    /* 完成系のJSX */
    // <CalcProvider>
    //   <Input name="a"/>
    //   <Input name="b" />
    //   <Select />
    //   <Result />
    // </CalcProvider>
    <>
      <h3>練習問題</h3>
      <p>
        Example内のコードをコンポーネントに分割してください。また、ステートはContext経由でやり取りしてください。
      </p>
      <Input name="a" />
      <Input name="b" />
      <Select />
      <Result /> // 編集
    </>
  )
}

export default Example
```

+ `$ touch src/070_practice_useContext/start/components/context/CalcContext.jsx`を実行<br>

+ `src/070_practice_useContext/start/components/context/CalcContext.jsx`を編集<br>

```jsx:CalcContext.jsx
import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const CalcContext = createContext()
const CalcDispatchContext = createContext()

export const useCalc = () => {
  return useContext(CalcContext)
}

export const useCalcDispatch = () => {
  return useContext(CalcDispatchContext)
}

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'change': {
      const { name, value } = payload
      return { ...state, [name]: value }
    }
    case 'add': {
      return { ...state, result: state.a + state.b }
    }
    case 'minus': {
      return { ...state, result: state.a - state.b }
    }
    case 'divide': {
      return { ...state, result: state.a / state.b }
    }
    case 'multiply': {
      return { ...state, result: state.a * state.b }
    }
    default:
      throw new Error('operator is invalid')
  }
}

export const CalcProvider = ({ children }) => {
  const initState = {
    a: 1,
    b: 2,
    result: 3,
  }

  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <CalcContext.Provider value={state}>
      <CalcDispatchContext.Provider value={dispatch}>
        {children}
      </CalcDispatchContext.Provider>
    </CalcContext.Provider>
  )
}
```

+ `11_hooks_p1/src/070_practice_useContext/start/Example.js`を編集<br>

```js:Example.js
import { CalcProvider } from './components/context/CalcContext' // 追加
import Input from './components/Input'
import Result from './components/Result'
import Select from './components/Select'

const Example = () => {
  return (
    /* 完成系のJSX */
    // <CalcProvider>
    //   <Input name="a"/>
    //   <Input name="b" />
    //   <Select />
    //   <Result />
    // </CalcProvider>
    <>
      <h3>練習問題</h3>
      <p>
        Example内のコードをコンポーネントに分割してください。また、ステートはContext経由でやり取りしてください。
      </p>
      <CalcProvider> // 追加
        <Input name="a" />
        <Input name="b" />
        <Select />
        <Result />
      </CalcProvider> // 追加
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/070_practice_useContext/start/components/Input.jsx`を編集<br>

```jsx:Input.jsx
import { useCalc, useCalcDispatch } from './context/CalcContext' // 追加

const Input = ({ name }) => {
  const state = useCalc() // 追加
  const dispatch = useCalcDispatch() // 追加
  const numChangeHandler = (e) => {
    dispatch({
      type: 'change',
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  return (
    <div>
      {name}:
      <input
        type="number"
        name={name}
        value={state[name]}
        onChange={numChangeHandler}
      />
    </div>
  )
}

export default Input
```

+ `src/070_practice_useContext/start/components/Result.jsx`を編集<br>

```jsx:Result.jsx
import { useCalc } from './context/CalcContext' // 追加

const Result = () => {
  const state = useCalc() // 追加

  return <h3>結果：{state.result}</h3>
}

export default Result
```

+ `$ src/070_practice_useContext/start/components/Select.jsx`を編集<br>

```jsx:Select.jsx
import { useCalc, useCalcDispatch } from "./context/CalcContext" // 追加

const CALC_OPTIONS = ['add', 'minus', 'divide', 'multiply']

const Select = () => {
  const state = useCalc() // 追加
  const dispatch = useCalcDispatch() // 追加
  const calculate = (e) => {
    dispatch({ type: e.target.value })
  }

  return (
    <select value={state.type} name="type" onChange={calculate}>
      {CALC_OPTIONS.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}

export default Select
```
