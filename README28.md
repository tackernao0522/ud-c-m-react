## 141. Action CreatorでActionを定義してみよう

+ `13_redux/start/src/App.js`を編集<br>

```js:App.jsx
import './App.css'

// import Example from "./010_redux_no_rtk/Example";
// import Example from './015_multiple_reducers/Example'
import Example from "./020_actionCreator/Example"; // 編集
// import Example from "./030_redux_toolkit/Example";
// import Example from "./040_immer/Example";
// import Example from "./050_redux_thunk/Example";
// import Example from "./060_createAsyncThunk/Example";
// import Example from "./070_middleware/Example";

const App = () => {
  return (
    <div className="App">
      <h2>練習コード（start）</h2>
      <Example />
    </div>
  )
}

export default App
```

+ `13_redux/start/src/020_actionCreator/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux'

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch()
  // const dispatch = useCounterDispatch();

  const clickHandler = () => {
    dispatch({ type: 'counter/' + calcType, payload: step }) // 編集
  }

  return (
    <button onClick={clickHandler}>
      {calcType}
      {step}
    </button>
  )
}
export default CounterButton
```

+ `13_redux/start/src/020_actionCreator/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from 'redux'

const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  console.log(type)
  switch (type) {
    case 'counter/+':
      return state + step
    case 'counter/-':
      return state - step
    default:
      return state
  }
}

const reducers = combineReducers({
  counter: reducer,
})

export default createStore(reducers)
```

+ `13_redux/start/src/020_actionCreator/components/CounterResult.js`を編集<br>

```js:CounterResult.js
import { useSelector } from "react-redux"
const CounterResult = () => {
  // const state = useCounter();
  const state = useSelector(state => state);
  console.log(state);
  return <h3>{state.counter}</h3>; // 編集
};

export default CounterResult;
```

+ `13_redux/start/src/020_actionCreator/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from 'redux'

// ここからカット
const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  console.log(type)
  switch (type) {
    case 'counter/+':
      return state + step
    case 'counter/-':
      return state - step
    default:
      return state
  }
}
// ここまでカット

const reducers = combineReducers({
  counter: reducer,
})

export default createStore(reducers)
```

+ `mkdir 13_redux/start/src/020_actionCreator/modules && touch $_/counter.js`を実行<br>

+ `13_redux/start/src/020_actionCreator/modules/counter.js`を編集<br>

```js:counter.js
const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  console.log(type)
  switch (type) {
    case 'counter/+':
      return state + step
    case 'counter/-':
      return state - step
    default:
      return state
  }
}

export { reducer }
```

+ `13_redux/start/src/020_actionCreator/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from 'redux'
import { reducer } from '../modules/counter' // 追加

const reducers = combineReducers({
  counter: reducer,
})

export default createStore(reducers)
```

+ `13_redux/start/src/020_actionCreator/modules/counter.js`を編集<br>

```js:counter.js
const initialState = 0
const reducer = (state = initialState, { type, payload }) => {
  console.log(type)
  switch (type) {
    case 'counter/+':
      return state + payload
    case 'counter/-':
      return state - payload
    default:
      return state
  }
}

const add = (payload) => {
  return {
    type: 'counter/+',
    payload, // payload: payloadの略
  }
}

const minus = (payload) => {
  return {
    type: 'counter/-',
    payload, // payload: payloadの略
  }
}

export { reducer, add, minus }
```

+ `13_redux/start/src/020_actionCreator/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux'
import { add, minus } from '../modules/counter' // 追加

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch()
  // const dispatch = useCounterDispatch();

  const clickHandler = () => {
    const action = calcType === '+' ? add(step) : minus(step) // 追加
    console.log(action) // 追加
    dispatch(action) // 編集
  }

  return (
    <button onClick={clickHandler}>
      {calcType}
      {step}
    </button>
  )
}
export default CounterButton
```

## 142. Redux ToolkitでReduxを書き換えてみよう

+ `13_redux/start/src/App.js`を編集<br>

```js:App.js
import './App.css'

// import Example from "./010_redux_no_rtk/Example";
// import Example from './015_multiple_reducers/Example'
// import Example from "./020_actionCreator/Example";
import Example from "./030_redux_toolkit/Example";
// import Example from "./040_immer/Example";
// import Example from "./050_redux_thunk/Example";
// import Example from "./060_createAsyncThunk/Example";
// import Example from "./070_middleware/Example";

const App = () => {
  return (
    <div className="App">
      <h2>練習コード（start）</h2>
      <Example />
    </div>
  )
}

export default App
```

+ `13_redux/start/src/030_redux_toolkit/store/index.js`を編集<br>

```js:index.js
import { configureStore } from '@reduxjs/toolkit' // 追加
import { reducer } from './modules/counter'

// 編集
export default configureStore({
  reducer: {
    counter: reducer,
  },
})
// ここまで
```

+ `13_redux/start/src/030_redux_toolkit/store/modules/counter.js`を編集<br>

```js:counter.js
import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    add(state, { type, payload }) {
      console.log(type, payload)
      return state + payload
    },
    minus(state, { type, payload }) {
      console.log(type, payload)
      return state - payload
    },
  },
})

const { add, minus } = counter.actions

export { add, minus }
export default counter.reducer
```

+ `13_redux/start/src/030_redux_toolkit/store/index.js`を編集<br>

```js:index.js
import { configureStore } from '@reduxjs/toolkit'
import reducer from './modules/counter' // 追加

export default configureStore({
  reducer: {
    counter: reducer,
  },
})
```

+ `13_redux/start/src/030_redux_toolkit/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux'
import { add, minus } from '../store/modules/counter'

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch()
  console.log(add(step)) // 追加 確認してみる

  const clickHandler = () => {
    const action = calcType === '+' ? add(step) : minus(step)
    console.log(action)
    dispatch(action)
  }

  return (
    <button onClick={clickHandler}>
      {calcType}
      {step}
    </button>
  )
}
export default CounterButton
```

## 143. Redux Toolkitにおけるミュータブルな値の変更

+ `13_redux/start/src/App.js`を編集<br>

```js:App.js
import './App.css'

// import Example from "./010_redux_no_rtk/Example";
// import Example from './015_multiple_reducers/Example'
// import Example from "./020_actionCreator/Example";
// import Example from "./030_redux_toolkit/Example";
import Example from "./040_immer/Example"; // 編集
// import Example from "./050_redux_thunk/Example";
// import Example from "./060_createAsyncThunk/Example";
// import Example from "./070_middleware/Example";

const App = () => {
  return (
    <div className="App">
      <h2>練習コード（start）</h2>
      <Example />
    </div>
  )
}

export default App
```

+ `13_redux/start/src/040_immer/store/modules/counter.js`を編集<br>

```js:counter.js
import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  name: 'counter',
  // 編集
  initialState: {
    count: 0,
  },
  reducers: {
    add(state, { type, payload }) {
      const newState = { ...state }
      newState.count = state.count + payload
      console.log(type, payload)
      return newState
    },
    minus(state, { type, payload }) {
      const newState = { ...state }
      newState.count = state.count - payload
      console.log(type, payload)
      return newState
    },
    // ここまで
  },
})

const { add, minus } = counter.actions

export { add, minus }
export default counter.reducer
```

+ `13_redux/start/src/040_immer/components/CounterResults.js`を編集<br>

```js:CounterResults.js
import { useSelector } from "react-redux"
const CounterResult = () => {
  const count = useSelector(state => state.counter.count); // 編集
  // console.log(state)
  return <h3>{count}</h3>; // 編集
};

export default CounterResult;
```

+ `13_redux/start/src/040_immer/store/modules/counter.js`を編集(toolkitならではの書き方)<br>

```js:counter.js
import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    add(state, { type, payload }) {
      state.count = state.count + payload // 追加 immer + Redux Tooklitの場合これで良い(mutableな書き方でOK)
      // const newState = { ...state }
      // newState.count = state.count + payload
      // console.log(type, payload)
      // return newState
    },
    minus(state, { type, payload }) {
      state.count = state.count - payload // 追加
      // const newState = { ...state }
      // newState.count = state.count - payload
      // console.log(type, payload)
      // return newState
    },
  },
})

const { add, minus } = counter.actions

export { add, minus }
export default counter.reducer
```

## 144. Immerを使ったミュータブルな値の変更

### イミュータブル (immutable)

書き換えが不可 (元の値は変わらない)<br>
`文字列、数値、BigInt、真偽値、undefined、シンボル`<br>

### ミュータブル (mutable)

書き換えが可能 (元の値が変わる)<br>
`イミュータブルな値以外。オブジェクト。(Object、Arrayなど)`<br>

### イミュータブル (immutable) な値の変更

```
let val = 0

↓ 値の変更

val = 1
```

`val` -> `0`<br>
↓<br>
`1`<br>
変数の参照する先が変わっている => 元の値を上書きしたことにならない。=> immutable (変更不可の値) な値<br>

`メモリ空間`<br>

### ミュータブル (mutable) な値の変更

```
let val = [1, 2, 3]

↓ 配列の変更

val.push(4);
```

`val` -> `[]` -> `1` -> `2` -> `3` -> `4`<br>
変数の参照する先が変わらない。-> 配列の中身 (元の値) が変わっている！ -> mutableな値 (変更可能な値)<br>

`メモリ空間`<br>

### Immutabilityの保持

```
let val = [1, 2]

配列をコピーして値を変更

↓

val = [...val, 3]
```

`val` -> `[] .` -> `1` -> `2`<br>
↓<br>
`[]` -> `1` -> `2` -> `3`<br>
変数の参照する先が変わっている！ -> 元の値は変わらない！ -> immutabilityが保持されている。<br>

`メモリ空間`<br>

+ `$ touch 13_redux/start/src/040_immer/immer.js`を実行<br>

+ `13_redux/start/src/040_immer/Example.js`を編集<br>

```js:Example.js
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import store from "./store"
import "./immer" // 追加

const Example = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default Example;
```

+ `13_redux/start/src/040_immer/immer.js`を編集<br>

```js:immer.js
import produce from 'immer'

const state = {
  name: 'Tom',
  hobbies: ['tennis', 'soccer'],
}

const newState = produce(state, (draft) => {
  draft.name = 'John' // immutableな操作に変換される
  draft.hobbies = 'baseball' // immutablityである
  console.log(draft) // Proxy {i: 0, A: {…}, P: false, I: false, D: {…}, …}
  // return state // returnを入れるとエラーになるので使わないこと
})

console.log(state, newState) // {name: 'Tom', hobbies: Array(2)} {name: 'John', hobbies: Array(2)}
console.log(state === newState) // false
```

+ `13_redux/start/src/040_immer/Example.js`を編集(returnを使う場合)<br>

```js:Example.js
import produce from 'immer'

const state = {
  name: 'Tom',
  hobbies: ['tennis', 'soccer'],
}

const newState = produce(state, (draft) => {
  // draft.name = 'John' // immutableな操作に変換される
  // draft.hobbies = 'baseball' // immutablityである
  console.log(draft) // Proxy {i: 0, A: {…}, P: false, I: false, D: {…}, …}
  return [];
})

console.log(state, newState) // {name: 'Tom', hobbies: Array(2)} {name: 'John', hobbies: Array(2)}
console.log(state === newState) // false
```
