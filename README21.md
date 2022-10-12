## 115. useContextでグローバルな値を管理しよう

+ `11_hooks_p1/src/030_useContext/start/Example.js`を編集<br>

```js:Example.js
import Child from './components/Child'
import { createContext } from 'react' // 追加

const MyContext = createContext('hello') // 追加

const Example = () => {
  const value = 'hello'
  return <Child value={value} />
}

export default Example
```

↓(GrandChildに渡したい場合)<br>

+ `11_hooks_p1/src/030_useContext/start/Example.js`を編集<br>

```js:Example.js
import Child from './components/Child'
import { createContext } from 'react'

export const MyContext = createContext('hello') // exportをつける

const Example = () => {
  // const value = 'hello' // 削除
  return <Child /> // 編集
}

export default Example
```

+ `11_hooks_p1/src/030_useContext/start/components/GrandChild.js`を編集<br>

```js:GrandChild.js
import { useContext } from 'react' // 追加
import { MyContext } from '../Example' // 追加

const GrandChild = () => { // propsを削除
  const value = useContext(MyContext) // 追加

  return (
    <div style={{ border: '1px solid black' }}>
      <h3>孫コンポーネント</h3>
      {value}
    </div>
  )
}
export default GrandChild
```

+ `11_hooks_p1/src/030_useContext/start/components/Child.js`を編集<br>

```js:Child.js
import GrandChild from "./GrandChild";

const Child = () => ( // propsがいらなくなる
  <div style={{ border: "1px solid black", padding: 10 }}>
    <h3>子コンポーネント</h3>
    <GrandChild /> // 編集
  </div>
);

export default Child;
```

## 116. useContextでstateを管理してみよう

+ `11_hooks_p1/src/040_useContext_with_state/start/components/OtherChild.js`を編集<br>

```js:OtherChild.js
// import { useState } from "react"; // 削除

const OtherChild = () => {
  // const [ value, setValue ] = useState(0); // カット

  const clickHandler = (e) => {
    setValue((prev) => prev + 1);
  };

  return (
    <div>
      <h3>他の子コンポーネント</h3>
      <button onClick={clickHandler}>+</button>
      <h3>{value}</h3>
    </div>
  );
};

export default OtherChild;
```

+ `11_hooks_p1/src/040_useContext_with_state/start/Example.js`を編集<br>

```js:Example.js
import { createContext, useState } from 'react'
import Child from './components/Child'
import OtherChild from './components/OtherChild'
export const MyContext = createContext() // 編集

const Example = () => {
  const [value, setValue] = useState(0) // 追加

  return (
    <MyContext.Provider value={[value, setValue]}>
      <Child />
      <OtherChild />
    </MyContext.Provider>
  )
}

export default Example
```

+ `11_hooks_p1/src/040_useContext_with_state/start/components/OtherChild.js`を編集<br>

```js:OtherChild.js
import { useContext } from "react" // 追加
import { MyContext } from "../Example" // 追加

const OtherChild = () => {
  const [,setValue] = useContext(MyContext) // 追加

  const clickHandler = (e) => {
    setValue((prev) => prev + 1)
  }

  return (
    <div style={{ border: '1px solid black' }}>
      <h3>他の子コンポーネント</h3>
      <button onClick={clickHandler}>+</button>
      // <h3>{value}</h3> // 削除
    </div>
  )
}

export default OtherChild
```

+ `11_hooks_p1/src/040_useContext_with_state/start/components/GrandChild.js`を編集<br>

```js:GrandChild.js
import { useContext } from "react";
import { MyContext } from "../Example";
const GrandChild = () => {
  const [value] = useContext(MyContext); // 編集
  return (
    <div style={{ border: "1px solid black" }}>
      <h3>孫コンポーネント</h3>
      {value}
    </div>
  );
};
export default GrandChild;
```

## 117. useContextのリファクタリングをしてみよう

+ `11_hooks_p1/src/050_context_file/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import './Example.css'

const Example = () => {
  const [theme, setTheme] = useState('light')

  const changeTheme = (e) => setTheme(e.target.value)

  const THEMES = ['light', 'dark', 'red']

  return (
    <>
      <header className={`content-${theme}`}>
        {THEMES.map((_theme) => (
          <label>
            <input
              type="radio"
              key={_theme}
              value={_theme}
              checked={theme === _theme}
              onChange={changeTheme}
            />
            {_theme}
          </label>
        ))}
      </header>
      <main className={`content-${theme}`}>
        <h1>テーマの切り替え</h1>
      </main>
    </>
  )
}

export default Example
```

+ 画面更新すると問題なく動くようになる<br>

+ `11_hooks_p1/src/050_context_file/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import './Example.css'

const Example = () => {
  const [theme, setTheme] = useState('light')

  const changeTheme = (e) => setTheme(e.target.value)

  const THEMES = ['light', 'dark', 'red']

  return (
    <>
      // ここから切り取り
      <header className={`content-${theme}`}>
        {THEMES.map((_theme) => (
          <label>
            <input
              type="radio"
              key={_theme}
              value={_theme}
              checked={theme === _theme}
              onChange={changeTheme}
            />
            {_theme}
          </label>
        ))}
      </header>
      // ここまで切り取り
      <main className={`content-${theme}`}>
        <h1>テーマの切り替え</h1>
      </main>
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/050_context_file/start/components/Header.js`を編集<br>

```js:Header.js
const Header = () => {
  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => (
        <label>
          <input
            type="radio"
            key={_theme}
            value={_theme}
            checked={theme === _theme}
            onChange={changeTheme}
          />
          {_theme}
        </label>
      ))}
    </header>
  )
}

export default Header
```

+ `11_hooks_p1/src/050_context_file/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import './Example.css'

const Example = () => {
  const [theme, setTheme] = useState('light') // 切り取り

  const changeTheme = (e) => setTheme(e.target.value)

  const THEMES = ['light', 'dark', 'red'] // 切り取り

  return (
    <>
      // ここから切り取り
      <main className={`content-${theme}`}>
        <h1>テーマの切り替え</h1>
      </main>
      // ここまで切り取り
    </>
  )
}

export default Example
```

+ `11_hooks_p1/src/050_context_file/start/components/Main.js`を編集<br>

```js:Main.js
const Main = () => {
  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  )
}

export default Main
```

+ `11_hooks_p1/src/050_context_file/start/components/Header.js`を編集<br>

```js:Header.js
const Header = () => {
  const THEMES = ['light', 'dark', 'red'] // 追加

  const changeTheme = (e) => setTheme(e.target.value) // 追加

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => (
        <label>
          <input
            type="radio"
            key={_theme}
            value={_theme}
            checked={theme === _theme}
            onChange={changeTheme}
          />
          {_theme}
        </label>
      ))}
    </header>
  )
}

export default Header
```

+ `11_hooks_p1/src/050_context_file/start/Example.js`を編集<br>

```js:Example.js
import { createContext, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import './Example.css'

export const ThemeContext = createContext()

const Example = () => {
  const [theme, setTheme] = useState('light')

  return (
    // 編集
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Header />
      <Main />
    </ThemeContext.Provider>
    // ここまで
  )
}

export default Example
```

+ `11_hooks_p1/src/050_context_file/start/components/Header.js`を編集<br>

```js:Header.js
import { useContext } from 'react' // 追加
import { ThemeContext } from '../Example' // 追加

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext) // 追加

  const THEMES = ['light', 'dark', 'red']

  const changeTheme = (e) => setTheme(e.target.value)

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => (
        <label>
          <input
            type="radio"
            key={_theme}
            value={_theme}
            checked={theme === _theme}
            onChange={changeTheme}
          />
          {_theme}
        </label>
      ))}
    </header>
  )
}

export default Header
```

+ `11_hooks_p1/src/050_context_file/start/components/Main.js`を編集<br>

```js:Main.js
import { useContext } from 'react' // 追加
import { ThemeContext } from '../Example' // 追加

const Main = () => {
  const [theme] = useContext(ThemeContext) // 追加

  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  )
}

export default Main
```

+ これで動く<br>

+ `$ mkdir 050_context_file/start/context && touch $_/ThemeContext.jsx`を実行<br>

+ `11_hooks_p1/src/050_context_file/start/context/ThemeContext.jsx`を編集<br>

```jsx:ThemeContext.jsx
import { createContext, useState } from 'react'

export const ThemeContext = createContext() // Example.jsからカットして持ってくる

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light') // Example.jsからカットして持ってくる

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
```

+ `11_hooks_p1/src/050_context_file/start/Example.js`を編集<br>

```js:Example.js
import Header from './components/Header'
import Main from './components/Main'
import ThemeProvider from './context/ThemeContext'
import './Example.css'

const Example = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  )
}

export default Example
```

+ `11_hooks_p1/src/050_context_file/start/context/ThemeContext.jsx`を編集<br>

```jsx:ThemeContext.jsx
import { createContext, useContext, useState } from 'react' // 編集

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext) // 追加

export default ThemeProvider
```

+ `11_hooks_p1/src/050_context_file/start/components/Main.js`を編集<br>

```js:Main.js
import { useTheme } from '../context/ThemeContext'

const Main = () => {
  const [theme] = useTheme()

  return (
    <main className={`content-${theme}`}>
      <h1>テーマの切り替え</h1>
    </main>
  )
}

export default Main
```

+ `11_hooks_p1/src/050_context_file/start/components/Header.js`を編集<br>

```js:Header.js
import { useTheme } from '../context/ThemeContext' // 編集

const Header = () => {
  const [theme, setTheme] = useTheme() // 編集

  const THEMES = ['light', 'dark', 'red']

  const changeTheme = (e) => setTheme(e.target.value)

  return (
    <header className={`content-${theme}`}>
      {THEMES.map((_theme) => (
        <label key={_theme}> // 編集
          <input
            type="radio"
            value={_theme}
            checked={theme === _theme}
            onChange={changeTheme}
          />
          {_theme}
        </label>
      ))}
    </header>
  )
}

export default Header
```

+ これで動く<br>
