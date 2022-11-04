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
