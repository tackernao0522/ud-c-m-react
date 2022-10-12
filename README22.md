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
