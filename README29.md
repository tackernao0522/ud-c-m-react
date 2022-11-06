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
