## 145. Redux Thunkとは？ Redux Middlewareとの関係

### ReduxのReducerには副作用は書かない

Reducerは純粋関数として定義する。<br>
副作用が発生する操作はReducerには書かない。<br>

`副作用の例`<br>

```
コンソールへのログ出力
DOM操作
サーバーとの通信
タイマー処理
ランダムな値の生成
```

↓

```
ミドルウェア(middleware)に記載
```

+ `13_redux/start/src/App.js`を編集<br>

```js:App.js
import './App.css'

// import Example from "./010_redux_no_rtk/Example";
// import Example from './015_multiple_reducers/Example'
// import Example from "./020_actionCreator/Example";
// import Example from "./030_redux_toolkit/Example";
// import Example from "./040_immer/Example";
import Example from "./050_redux_thunk/Example"; // 編集
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

## 146. Redux Thunkで非同期処理を記述してみよう

+ `$ mkdir 050_redux_thunk/api && touch $_/counter.js`を実行<br>

+ `13_redux/start/src/050_redux_thunk/api/counter.js`を編集<br>

```js:counter.js
const asyncCount = (count = 1) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: count }), Math.random() * 1000),
  )
}

export default asyncCount
```

+ `13_redux/start/src/050_redux_thunk/store/modules/counter.js`を編集<br>

```js:counter.js
import { createSlice } from '@reduxjs/toolkit'
import asyncCount from '../../api/counter'

const counter = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    add(state, { type, payload }) {
      state.count = state.count + payload
      // const newState = { ...state };
      // newState.count = state.count + payload
      // return newState;
    },
    minus(state, { type, payload }) {
      state.count = state.count - payload
      // const newState = { ...state };
      // newState.count = state.count - payload
      // return newState;
    },
  },
})

const { add, minus } = counter.actions

// 追加
const addAsync = (payload) => {
  return async (dispatch, getState) => {
    const response = await asyncCount(payload)
    dispatch(add(response.data))
  }
}
// ここまで

export { add, minus, addAsync } // 編集
export default counter.reducer
```

+ `13_redux/start/src/050_redux_thunk/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux'
import { add, minus } from '../store/modules/counter' // カットする

const CounterButton = ({ calcType, step, actionCreator }) => { // actionCreatorを追加
  const dispatch = useDispatch()
  const clickHandler = () => {
    // const action = calcType === '+' ? add(step) : minus(step) コメントアウト
    dispatch(actionCreator(step)) // 追加
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

+ `13_redux/start/src/050_redux_thunk/components/Counter.js`を編集<br>

```js:Counter.js
import { add, minus, addAsync } from '../store/modules/counter' // 追加
import CounterResult from './CounterResult'
import CounterButton from './CounterButton'

const Counter = () => {
  return (
    <>
      <CounterResult />
      // 編集
      <CounterButton step={2} calcType="+" actionCreator={add} />
      <CounterButton step={2} calcType="-" actionCreator={minus} />
      <CounterButton step={2} calcType="非同期(+)" actionCreator={addAsync} />
      // ここまで
    </>
  )
}
export default Counter
```

+ `13_redux/start/src/050_redux_thunk/store/modules/counter.js`を編集<br>

```js:counter.js
import { createSlice } from '@reduxjs/toolkit'
import asyncCount from '../../api/counter'

const counter = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    add(state, { type, payload }) {
      state.count = state.count + payload
      // const newState = { ...state };
      // newState.count = state.count + payload
      // return newState;
    },
    minus(state, { type, payload }) {
      state.count = state.count - payload
      // const newState = { ...state };
      // newState.count = state.count - payload
      // return newState;
    },
  },
})

const { add, minus } = counter.actions

const addAsync = (payload) => {
  return async (dispatch, getState) => {
    const state = getState() // 追加
    console.log(state) // 追加
    const response = await asyncCount(payload)
    dispatch(add(response.data))
  }
}

export { add, minus, addAsync }
export default counter.reducer
```
