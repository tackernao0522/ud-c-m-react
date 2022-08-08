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
