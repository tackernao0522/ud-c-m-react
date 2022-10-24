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

___グローバルステート__<br>
アプリ全体で共有されるステート<br>

例) useContext, Redux <br>

__ローカルステート__<br>
特定のコンポーネント内でのみ使用されるステート<br>
