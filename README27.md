# セクション13: [発展] ReduxとRedux Toolkit

## 136. Reduxとグローバルな状態管理

+ `Redux`とは<br>

Reactとは別の状態管理のためのライブラリ => React以外のライブラリとも組み合わせて使用可能<br>

+ `Redux Toolkit (RTK)<br>

巣のReduxは他のライヴラリが必要なケースが多い。=> 公式が推薦する設定や書き方をまとめたもの。

[Redux Toolkit(RTK)]<br>

```
Redux
Immer
redux-thunk
createSlice...
```

+ `ステート (状態管理)`<br>

__グローバルステート__<br>
アプリ全体で共有されるステート<br>

例) useContext, Redux <br>

__ローカルステート__<br>
特定のコンポーネント内でのみ使用されるステート<br>

## 138. Reduxを使ってみよう

+ `13_redux/start/src/App.js`を編集<br>

```js:App.js
import "./App.css";

import Example from "./010_redux_no_rtk/Example"; // これを使う
// import Example from "./015_multiple_reducers/Example";
// import Example from "./020_actionCreator/Example";
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
  );
};

export default App;
```

+ `13_redux/start/src/010_redux_no_rtk/Example.js`を編集(素のReduxであり参考程度に。。。)実際にはRedux Tool Kitを使用すること(推奨)<br>

```js:Example.js
import Counter from './components/Counter'
import { Provider } from 'react-redux' // 追加

// useContext x useReducer
const Example = () => {
  return (
    <Provider store={}> // 編集
      <Counter />
    </Provider> // 編集
  )
}

export default Example
```

+ `13_redux/start/src/010_redux_no_rtk/Example.js`を編集(素のReduxであり参考程度に。。。)<br>

```js:Example.js
import Counter from './components/Counter'
import { Provider } from 'react-redux'
import store from "./store" // 追加

// useContext x useReducer
const Example = () => {
  return (
    <Provider store={store}> // 編集
      <Counter />
    </Provider>
  )
}

export default Example
```

+ `13_redux/start/src/010_redux_no_rtk/context/CounterContext.js`を編集<br>

```js:CounterContext.js
import { createContext, useContext, useReducer } from "react";

const CounterContext = createContext();
const CounterDispatchContext = createContext();

// 追加
const reducer = (prev, { type, step }) => {
  switch (type) {
    case "+":
      return prev + step;
    case "-":
      return prev - step;
    default:
      throw new Error('不明なactionです。')
  }
}
// ここまで

const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, 0); // 編集
    return (
        <CounterContext.Provider value={state}>
            <CounterDispatchContext.Provider value={dispatch}>
                {children}
            </CounterDispatchContext.Provider>
        </CounterContext.Provider>
    )
}

const useCounter = () => {
    return useContext(CounterContext);
}

const useCounterDispatch = () => {
    return useContext(CounterDispatchContext);
}

export { CounterProvider, useCounter, useCounterDispatch }
```

+ `$ mkdir 010_redux_no_rtk/store && touch $_/index.js`を実行<br>

+ `13_redux/start/src/010_redux_no_rtk/store/index.js`を編集<br>

```js:index.js
import { createStore } from 'redux'

const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  switch (type) {
    case '+':
      return state + step
    case '-':
      return state - step
    default:
      return state // 編集
  }
}

export default createStore(reducer)
```

+ `13_redux/start/src/010_redux_no_rtk/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux' // 追加
// import { useCounterDispatch } from '../context/CounterContext' // 削除

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch() // 追加
  // const dispatch = useCounterDispatch() // 削除

  const clickHandler = () => {
    dispatch({ type: calcType, step })
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

+ `13_redux/start/src/010_redux_no_rtk/components/CounterResult.js`を編集<br>

```js:CounterResult.js
import { useSelector } from "react-redux";
// import { useCounter } from "../context/CounterContext"; // 削除

const CounterResult = () => {
  // const state = useCounter(); // 削除
  const state = useSelector(state => state) // 追加
  return <h3>{state}</h3>;
};

export default CounterResult;
```

## 139. Reduxの状態管理方法について学ぼう

+ [Reduxのデータフロー](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow) <br>

## 140. 複数のReducerを使う方法

+ `13_redux/start/src/App.js`を編集<br>

```js:App.js
import './App.css'

// import Example from "./010_redux_no_rtk/Example";
import Example from './015_multiple_reducers/Example' // 使用
// import Example from "./020_actionCreator/Example";
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

+ `13_redux/start/src/015_multiple_reducers/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from "redux"; // 編集

const initialState = 0;
const reducer = (state = initialState, { type, step }) => {
    switch (type) {
      case "+":
        return state + step;
      case "-":
        return state - step;
      default:
        return state;
    }
  };

  // 追加
  const reducers = combineReducers({
    counter: reducer
  })
  // ここまで

export default createStore(
    reducers
)
```

+ `13_redux/start/src/015_multiple_reducers/components/CounterResult.js`を編集<br>

```js:CounterResult.js
// import { useCounter } from "../context/CounterContext";
import { useSelector } from 'react-redux'
const CounterResult = () => {
  // const state = useCounter();
  const state = useSelector((state) => state.counter) // 編集
  console.log(state) // {counter: 0} state.counterとすると 0 になる 追加
  return <h3>{state}</h3>
}

export default CounterResult
```

+ `13_redux/start/src/015_multiple_reducers/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from 'redux'

const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  console.log(type) // 追加 `+2`をクリックすると '+'と表示されることが確認できる
  switch (type) {
    case '+':
      return state + step
    case '-':
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

+ `13_redux/start/src/015_multiple_reducers/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from 'redux'

const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  console.log(type)
  switch (type) {
    case '+':
      return state + step
    case '-':
      return state - step
    default:
      return state
  }
}

// 追加
const reducer2 = (state = initialState, { type, step }) => {
  console.log(type) // ここも '+'と表示される
  switch (type) {
    case '+':
      return state + step
    case '-':
      return state - step
    default:
      return state
  }
}
// ここまで

const reducers = combineReducers({
  counter: reducer,
  counter2: reducer2, // 追加
})

export default createStore(reducers)
```

+ `13_redux/start/src/015_multiple_reducers/components/CounterResult.js`を編集<br>

```js:CounterResult.js
// import { useCounter } from "../context/CounterContext";
import { useSelector } from 'react-redux'
const CounterResult = () => {
  // const state = useCounter();
  const state = useSelector((state) => state)
  console.log(state)
  return <h3>{state.counter}:{state.counter2}</h3> // 編集
}

export default CounterResult
```

+ index.jsには `{counter: 2, counter2: 2}`をコンソールで確認できる<br>

+ `13_redux/start/src/015_multiple_reducers/store/index.js`を編集<br>

```js:index.js
import { createStore, combineReducers } from 'redux'

const initialState = 0
const reducer = (state = initialState, { type, step }) => {
  console.log(type)
  switch (type) {
    case 'counter/+': // 編集
      return state + step
    case 'counter/-': // 編集
      return state - step
    default:
      return state
  }
}

const reducer2 = (state = initialState, { type, step }) => {
  console.log(type)
  switch (type) {
    case 'counter2/+': // 編集
      return state + step
    case 'counter2/-': // 編集
      return state - step
    default:
      return state
  }
}

const reducers = combineReducers({
  counter: reducer,
  counter2: reducer2,
})

export default createStore(reducers)
```

+ `13_redux/start/src/015_multiple_reducers/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux'
// import { useCounterDispatch } from "../context/CounterContext";

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch()
  // const dispatch = useCounterDispatch();

  const clickHandler = () => {
    dispatch({ type: 'counter/' + calcType, step }) // 編集
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

+ 上記のようにしていくと`counter`の方の`state`だけ更新されるようになる<br>

+ `13_redux/start/src/015_multiple_reducers/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useDispatch } from 'react-redux'
// import { useCounterDispatch } from "../context/CounterContext";

const CounterButton = ({ calcType, step }) => {
  const dispatch = useDispatch()
  // const dispatch = useCounterDispatch();

  const clickHandler = () => {
    dispatch({ type: 'counter2/' + calcType, step }) // 編集
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

+ 今度は`counter2`の方のstateのみ更新されるようになる<br>
