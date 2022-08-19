# セクション7: スタイリング

## 72. インラインスタイルの使い方！

+ `07_styling_component/src/010_inline_style/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  const style = {
    width: 120, // "120px"でも良いが数値にすると自動的に pxがつく
    height: 60,
    display: 'block',
    fontWeight: 'bold',
    'border-radius': 9999, // borderRadius の場合は "" 入らない
    cursor: 'pointer',
    border: 'none',
    margin: 'auto',
    background: isSelected ? 'pink' : '',
  }

  return (
    <>
      <button onClick={clickHandler} style={style}>
        ボタン
      </button>
      <div style={{ textAlign: 'center' }}>
        {isSelected && 'クリックされました。'}
      </div>
    </>
  )
}

export default Example
```

## 73. インラインスタイルの注意点

+ `07_styling_component/src/010_inline_style/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  const style = {
    width: 120, // "120px"でも良いが数値にすると自動的に pxがつく
    height: 60,
    display: 'block',
    fontWeight: 'bold',
    'border-radius': 9999, // borderRadius の場合は "" 入らない
    cursor: 'pointer',
    border: 'none',
    margin: 'auto',
    background: isSelected ? 'pink' : '',
    // ::before, ::after, :hover, :active 擬似要素はインラインスタイルでは使用できない
    // メディアクエリも使用できない @media (min-width: 600px) { }
    // インラインスタイルはパフォーマンスが良くないのであまり使用されない
  }

  return (
    <>
      <button onClick={clickHandler} style={style}>
        ボタン
      </button>
      <div style={{ textAlign: 'center' }}>
        {isSelected && 'クリックされました。'}
      </div>
    </>
  )
}

export default Example
```

## 74. 外部CSSのimportを使ったスタイリング

+ `07_styling_component/src/020_import_css/start/Example.css`を編集<br>

```css:Example.css
.btn {
    margin: auto;
    border-radius: 9999px;
    border: none;
    display: block;
    width: 120px;
    height: 60px;
    font-weight: bold;
    cursor: pointer;
}

.selected {
    background-color: pink;
}
```

+ `07_styling_component/src/020_import_css/start/Example.js`を編集①<br>

```js:Example.js
import { useState } from 'react'
import './Example.css'

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <button className={isSelected ? "btn selected" : "btn"} onClick={clickHandler}>
        ボタン
      </button>
      <div style={{ textAlign: 'center' }}>
        {isSelected && 'クリックされました。'}
      </div>
    </>
  )
}

export default Example
```

+ `07_styling_component/src/020_import_css/start/Example.js`を編集②<br>

```js:Example.js
import { useState } from 'react'
import './Example.css'

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <button className={`btn ${isSelected ? "selected" : ""}`} onClick={clickHandler}>
        ボタン
      </button>
      <div style={{ textAlign: 'center' }}>
        {isSelected && 'クリックされました。'}
      </div>
    </>
  )
}

export default Example
```

`07_styling_component/src/020_import_css/start/Example.js`を編集(注意点)<br>

```js:Example.js
import { useState } from 'react'
import './Example.css'

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <button className={`btn ${isSelected ? "selected" : ""}`} onClick={clickHandler}>
        ボタン
      </button>
      <button className="btn">
        サブボタン
      </button>
      <div style={{ textAlign: 'center' }}>
        {isSelected && 'クリックされました。'}
      </div>
    </>
  )
}

export default Example
```

+ `$ mkdir components && touch $_/SubButton.jsx`を実行<br>

`07_styling_component/src/020_import_css/start/components/SubButton.jsx`を編集<br>

```jsx:SubButton.jsx
import './SubButton.css'

export const SubButton = () => {
  return <button className="btn">サブボタン</button>
}
```

`07_styling_component/src/020_import_css/start/components/SubButton.css`を作成<br>

`07_styling_component/src/020_import_css/start/components/SubButton.css`を編集<br>

```css:SubButton.css
.btn {
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  background: orange;
}

.selected {
  background-color: pink;
}
```

 `07_styling_component/src/020_import_css/start/Example.js`を編集(注意点)<br>

```js:Example.js
import { useState } from 'react'
import { SubButton } from './components/SubButton'
import './Example.css'

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <button className={`btn ${isSelected ? "selected" : ""}`} onClick={clickHandler}>
        ボタン
      </button>
      <SubButton />
      <div style={{ textAlign: 'center' }}>
        {isSelected && 'クリックされました。'}
      </div>
    </>
  )
}

export default Example
```

+ 上記のやり方だと両方ともオレンジになってしまう(画面全体に適用されるCSSになっている)<br>

## 75. CSS Modulesを使ったスタイリング

+ [CSS Modules将来非推奨](https://github.com/webpack-contrib/css-loader/issues/1050)<br>

+ `07_styling_component/src/030_css_module/start/Example.css`を`Example.module.css`にリネーム<br>

+ `07_styling_component/src/030_css_module/start/components/SubButton.css`を`SubButton.module.css`にリネーム<br>

+ `07_styling_component/src/030_css_module/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

import SubButton from "./components/SubButton";
import styles from "./Example.module.css" // 編集

console.log(styles)
const Example = () => {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => setIsSelected((prev) => !prev);

  return (
    <>
      <button className={`btn ${isSelected ? "selected" : ""}`} onClick={clickHandler}>
        ボタン
      </button>
      <SubButton />
      <div style={{ textAlign: "center" }}>
        {isSelected && "クリックされました。"}
      </div>
    </>
  );
};

export default Example;
```

+ `07_styling_component/src/030_css_module/start/components/SubButton.js`を編集<br>

```js:SubButton.js
import "./SubButton.module.css";

const SubButton = () => {
    return <button className="btn">サブボタン</button>
}
export default SubButton;
```

+ `07_styling_component/src/030_css_module/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

import SubButton from "./components/SubButton";
import styles from "./Example.module.css"

const Example = () => {
  const [isSelected, setIsSelected] = useState(false);

  const clickHandler = () => setIsSelected((prev) => !prev);

  return (
    <>
      <button className={`${styles.btn} ${isSelected ? styles.selected : ""}`} onClick={clickHandler}>
        ボタン
      </button>
      <SubButton />
      <div style={{ textAlign: "center" }}>
        {isSelected && "クリックされました。"}
      </div>
    </>
  );
};

export default Example;
```

+ `07_styling_component/src/030_css_module/start/components/SubButton.js`を編集<br>

```js:SubButton.js
import styles from "./SubButton.module.css";

const SubButton = () => {
    return <button className={styles.btn}>サブボタン</button>
}
export default SubButton;
```

+ `07_styling_component/src/030_css_module/start/Example.module.css`を編集<br>

```css:Example.module.css
.btn {
    margin: auto;
    border-radius: 9999px;
    border: none;
    display: block;
    width: 120px;
    height: 60px;
    font-weight: bold;
    cursor: pointer;
    background: orange;
}

.btn:hover {
    background-color: red;
}

.selected {
    background-color: pink;
}
```

+ `07_styling_component/src/030_css_module/start/Example.module.css`を編集<br>

```css:Example.module.css
.btn {
    margin: auto;
    border-radius: 9999px;
    border: none;
    display: block;
    width: 120px;
    height: 60px;
    font-weight: bold;
    cursor: pointer;
    background: orange;
}

.btn:hover {
    background-color: red;
}

.btn:active {
    background-color: purple;
}

.selected {
    background-color: pink;
}
```

+ `07_styling_component/src/030_css_module/start/Example.module.css`を編集<br>

```css:Example.module.css
.btn {
    margin: auto;
    border-radius: 9999px;
    border: none;
    display: block;
    width: 120px;
    height: 60px;
    font-weight: bold;
    cursor: pointer;
    background: orange;
}

.btn:hover {
    background-color: red;
}

.btn:active {
    background-color: purple;
}

/* こう書くと他のボタンまで反映されてしまう */
/* button {
  background: green;
} */

.selected {
    background-color: pink;
}

#idAttr {
    background-color: blue;
}

@media (max-width: 600px) {
    .btn {
        border-radius: 0;
    }
}
```

+ `07_styling_component/src/030_css_module/start/components/SubButton.js`を編集<br>

```js:SubButton.js
import styles from "./SubButton.module.css";

const SubButton = () => {
    // 基本的にはidはあまり使わない方がよい
    return <button id={styles.idAttr} className={styles.btn}>サブボタン</button>
}
export default SubButton;
```
