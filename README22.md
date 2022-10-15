## 118. useContextを使う際の注意点

+ `$ touch 11_hooks_p1/src/060_context_file_render/start/components/Footer.jsx`を実行<br>

+ `src/060_context_file_render/start/components/Footer.jsx`を編集<br>

```jsx:Footer.jsx
import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const [, setTheme] = useTheme()

  console.log('footer')
  return (
    <footer>
      <h1>フッター</h1>
    </footer>
  )
}

export default Footer
```

+ `src/060_context_file_render/start/Example.js`を編集<br>

```js:Example.js
import "./Example.css";
import Main from "./components/Main";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer"; // 追加

const Example = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer /> // 追加
    </ThemeProvider>
  );
};

export default Example;
```

+ `src/060_context_file_render/start/components/Header.jsx`を編集<br>

```jsx:Header.jsx
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [theme, setTheme] = useTheme()

  const THEMES = ['light', 'dark', 'red']

  const changeTheme = (e) => setTheme(e.target.value)

  console.log('header') // 追加

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => {
        return (
          <label key={_theme}>
            <input
              type="radio"
              value={_theme}
              checked={theme === _theme}
              onChange={changeTheme}
            />
            {_theme}
          </label>
        )
      })}
    </header>
  )
}

export default Header
```

+ `src/060_context_file_render/start/components/Main.jsx`を編集<br>

```jsx:Main.jsx
import { useTheme } from "../context/ThemeContext"

const Main = () => {
  const [theme] = useTheme();

  console.log('main') // 追加

  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  );
};

export default Main;
```

+ localhost:3001 で検証ツールを開いてレンダリングの確認をしてみる<br>

＊ 結果： チェックボックスを変える都度に全てのコンポーネントにおいて再レンダリングされているのがわかる<br>

本来は `set関数`のみを使っているコンポーネントは再レンダリング は不要であるが現状態ではしてしまっている<br>

```:console
header
main
footer
```

* 解決してみる<br>

+ `src/060_context_file_render/start/components/ThemeContext.jsx`を編集<br>

```js:ThemeContext.jsx
import { useState, useContext, createContext } from 'react'

export const ThemeContext = createContext()
export const ThemeUpdateContext = createContext() // 追加

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}> // 追加
        {children}
      </ThemeUpdateContext.Provider> // 追加
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export const useUpdateTheme = () => useContext(ThemeUpdateContext) // 追加
```

+ `src/060_context_file_render/start/components/Footer.jsx`を編集<br>

```jsx:Footer.jsx
import { useUpdateTheme } from '../context/ThemeContext'

const Footer = () => {
  const setTheme = useUpdateTheme()

  console.log('footer')
  return (
    <footer>
      <h1>フッター</h1>
    </footer>
  )
}

export default Footer
```

+ `src/060_context_file_render/start/components/Header.jsx`を編集<br>

```jsx:Header.jsx
import { useTheme, useUpdateTheme } from '../context/ThemeContext' // 編集

const Header = () => {
  const theme = useTheme() // 編集
  const setTheme = useUpdateTheme() // 追加

  const THEMES = ['light', 'dark', 'red']

  const changeTheme = (e) => setTheme(e.target.value)

  console.log('header')

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => {
        return (
          <label key={_theme}>
            <input
              type="radio"
              value={_theme}
              checked={theme === _theme}
              onChange={changeTheme}
            />
            {_theme}
          </label>
        )
      })}
    </header>
  )
}

export default Header
```

+ `src/060_context_file_render/start/components/Main.jsx`を編集<br>

```jsx:Main.jsx
import { useTheme } from "../context/ThemeContext"

const Main = () => {
  const theme = useTheme(); // 編集

  console.log('main')

  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  );
};

export default Main;
```

+ localhost:3001 で検証ツールを開いてレンダリングの確認をしてみる<br>

```:console
header
main
footer
header
main
header
main
```

＊ 最初のリロード時以外はfooterコンポーネントは再レンダリング されていないのがわかる<br>

## 119. useContextとuseReducerを組み合わせて使ってみよう

+ `11_hooks_p1/src/065_useContext_with_reducer/start/Example.js`を編集<br>

+ `$ mkdir 065_useContext_with_reducer/start/components/context && touch $_/CounterContext.jsx`を実行<br>

+ `11_hooks_p1/src/065_useContext_with_reducer/start/components/context/CounterContext.jsx`を編集<br>

```jsx:CounterContext.jsx
import { createContext, useContext, useReducer } from 'react'

const CounterContext = createContext()
const CounterDispatchContext = createContext()

// Example.jsから切り取ってもってくる
const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prev, { type, step }) => {
    switch (type) {
      case '+':
        return prev + step
      case '-':
        return prev - step
      default:
        throw new Error('不明なactionです。')
    }
  }, 0)
  // ここまで

  return (
    <CounterContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
  )
}

const useCounter = () => {
  return useContext(CounterContext)
}

const useCounterDispatch = () => {
  return useContext(CounterDispatchContext)
}

export { CounterProvider, useCounter, useCounterDispatch }
```

+ `11_hooks_p1/src/065_useContext_with_reducer/start/Example.js`を編集<br>

```js:Example.js
import { CounterProvider } from "./components/context/CounterContext";
import Counter from "./components/Counter";

// POINT useContext x useReducer
const Example = () => {
  const countUp = () => {
    dispatch({ type: "+", step: 2 });
  };
  const countDown = () => {
    dispatch({ type: "-", step: 2 });
  };
  return (
    <CounterProvider> // 追加
      <Counter state={state} countUp={countUp} countDown={countDown} />
    </CounterProvider> // 追加
  );
};

export default Example;
```

+ `11_hooks_p1/src/065_useContext_with_reducer/start/components/Counter.js`を編集<br>

```js:Counter.js
import CounterResult from "./CounterResult"
import CounterButton from "./CounterButton"

const Counter = ({ state, countUp, countDown }) => {
    return (
        <>
            <CounterResult state={state} />
            <CounterButton step={2} calcType="+" /> // 編集
            <CounterButton step={2} calcType="-" /> // 編集
        </>
    )
}
export default Counter;
```

+ `11_hooks_p1/src/065_useContext_with_reducer/start/components/CounterButton.js`を編集<br>

```js:CounterButton.js
import { useCounterDispatch } from './context/CounterContext'

const CounterButton = ({ calcType, step }) => {
  const dispatch = useCounterDispatch()
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

+ `11_hooks_p1/src/065_useContext_with_reducer/start/components/CounterResult.js`を編集<br>

```js:CounterResult.js
import { useCounter } from './context/CounterContext'

const CounterResult = () => {
  const state = useCounter()
  return <h3>{state}</h3>
}

export default CounterResult
```

+ `11_hooks_p1/src/065_useContext_with_reducer/start/components/Counter.js`を編集<br>

```js:Counter.js
import CounterResult from './CounterResult'
import CounterButton from './CounterButton'

const Counter = () => {
  return (
    <>
      <CounterResult /> // 編集
      <CounterButton step={2} calcType="+" />
      <CounterButton step={2} calcType="-" />
    </>
  )
}
export default Counter
```

+ `11_hooks_p1/src/065_useContext_with_reducer/start/Example.js`を編集<br>

```js:Example.js
import { CounterProvider } from './components/context/CounterContext'
import Counter from './components/Counter'

// POINT useContext x useReducer
const Example = () => {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  )
}

export default Example
```

+ `11_hooks_p1/src/065_useContext_with_reducer/start/components/Counter.js`を編集<br>

```js:Counter.js
import CounterResult from './CounterResult'
import CounterButton from './CounterButton'

const Counter = () => {
  return (
    <>
      <CounterResult />
      <CounterButton step={2} calcType="+" />
      <CounterButton step={2} calcType="-" />
      <CounterButton step={10} calcType="+" />
      <CounterButton step={10} calcType="-" />
    </>
  )
}
export default Counter
```

+ これで動く<br>
