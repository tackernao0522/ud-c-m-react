セクション4: まずはReactに触れてみよう

## 21. Reactを動かしてみよう

+ `04_react_basic/extra_src/01_run_react/start/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html>

<head>
  <script src="/libs/react.development.js"></script>
  <script src="/libs/react-dom.development.js"></script>
  <script src="/libs/babel-standalone.js"></script>
</head>

<body>
  <div id="app"></div>
  <script>
    const appEl = document.querySelector('#app');
    const root = ReactDOM.createRoot(appEl);
    root.render('こんにちは');
  </script>
</body>

</html>
```

+ `04_react_basic/extra_src/01_run_react/start/index.html`を編集(React18)<br>

```html:index.html
<!DOCTYPE html>
<html>

<head>
  <script src="/libs/react.development.js"></script>
  <script src="/libs/react-dom.development.js"></script>
  <script src="/libs/babel-standalone.js"></script>
</head>

<body>
  <div id="app"></div>
  <script type="text/babel"> // 編集
    const appEl = document.querySelector('#app');
    const root = ReactDOM.createRoot(appEl);
    root.render(<h1>こんにちは</h1>); // 編集
  </script>
</body>

</html>
```

+ `04_react_basic/extra_src/01_run_react/start/index.html`を編集(React17)<br>

```html:index.html
<!DOCTYPE html>
<html>

<head>
  <script src="/libs/react.development.js"></script>
  <script src="/libs/react-dom.development.js"></script>
  <script src="/libs/babel-standalone.js"></script>
</head>

<body>
  <div id="app"></div>
  <script type="text/babel">
    const appEl = document.querySelector('#app');
    ReactDOM.render(<h1>こんにちは</h1>, appEl);
  </script>
</body>

</html>
```

## 22. Reactコンポーネントって何? コンポーネントを定義してみよう

### コンポーネント(Component)

画面の描く構成要素をReactで定義したもの。<br>
↓<br>
+ 再利用性の向上（コードが使いまわせる）<br>
+ 可読性の向上（コードが整理される）<br>
+ 疎結合になる（バグを減らせる）<br>

### コンポーネントの定義(Defining a component)

コンポーネントはJavaScriptの関数として定義する。<br>

```jsx:Sample.jsx
function Welcome() {
  return <h1>Hello</h1>; // コンポーネントはJSXを返す
}
```
↓ <br>

```js:sample.js
<Welcome /> // コンポーネントの実行
```

+ `04_react_basic/extra_src/02_component/start/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html>

<head>
    <script src="/libs/react.development.js"></script>
    <script src="/libs/react-dom.development.js"></script>
    <script src="/libs/babel-standalone.js"></script>
</head>

<body>
    <div id="app"></div>
    <script type="text/babel">
        const appEl = document.querySelector('#app');
        const root = ReactDOM.createRoot(appEl);
        function Example() {
            return <h1>Hello Components</h1>;
        }
        root.render(<Example />);
    </script>
</body>

</html>
```

+ `04_react_basic/extra_src/02_component/start/index.html`を編集(アロー関数コンポーネント)<br>

```html:index.html
<!DOCTYPE html>
<html>

<head>
    <script src="/libs/react.development.js"></script>
    <script src="/libs/react-dom.development.js"></script>
    <script src="/libs/babel-standalone.js"></script>
</head>

<body>
    <div id="app"></div>
    <script type="text/babel">
        const appEl = document.querySelector('#app');
        const root = ReactDOM.createRoot(appEl);
        const Example = () => {
            return <h1>Hello Components</h1>;
        }
        root.render(<Example />);
    </script>
</body>

</html>
```

## 23. Reactのプロジェクトの作成方法(create-react-appの使い方)

### インストール
npm i -g create-react-app

### create-react-appドキュメント
npm docs create-react-app

#### プロジェクトの作成方法
create-react-app {フォルダ名}

+ `$ cd 04_react_basic/extra_src/03_create_react_app`を実行<br>

+ `$ sudo npm i -g create-react-app`を実行<br>

+ `$ create-react-app sample-react`を実行<br>

+ `$ cd sample-react`を実行<br>

+ `$ npm start`を実行<br>

+ `$ npm run eject`を実行してみる(見えないファイルが可視化される)<br>

+ `04_react_basic/extra_src/03_create_react_app/sample-react/src/App.js`を編集<br>

```js:App.js
import './App.css';

function App() {
  return (
    <h1>hello react</h1>
  );
}

export default App;
```