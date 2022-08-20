## 76. [styled-components] CSS-in-JSを使ったスタイリング

+ [styled-components](https://github.com/styled-components/styled-components)<br>

+ [タグ付きテンプレート](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals)<br>

+ `07_styling_component`の中に`styled_components`がインストールされていなければ `npm`でインストールする<br>

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

// console.dir(styled)

const StyledButton = styled.button`
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
`
const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton>ボタン</StyledButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

// console.dir(styled)

const StyledButton = styled.button`
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? 'pink' : '')};
`
const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton isSelected={isSelected} onClick={clickHandler}>ボタン</StyledButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集(styled-componentsをObject形式で書く(あまり使わない))<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button({
  color: 'red'
})

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton>ボタン</StyledButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

## 77. [styled-components] [発展] CSS-in-JSを使ったスタイリング

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集(継承)<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

// console.dir(styled)

const StyledButton = styled.button`
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? 'pink' : '')};
`

// 継承
const OrangeButton = styled(StyledButton)`
  background-color: orange;

  :hover {
    color: red;
    opacity: 0.7;
  }
`

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton isSelected={isSelected} onClick={clickHandler}>ボタン</StyledButton>
      <OrangeButton isSelcted={isSelected} onClick={clickHandler}>ボタン</OrangeButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集(メディアクエリ)<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

// console.dir(styled)

const StyledButton = styled.button`
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? 'pink' : '')};

  @media (max-width: 600px) {
    border-radius: 0;
  }
`

const OrangeButton = styled(StyledButton)`
  background-color: orange;

  :hover {
    color: red;
    opacity: 0.7;
  }
`

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton isSelected={isSelected} onClick={clickHandler}>
        ボタン
      </StyledButton>
      <OrangeButton isSelcted={isSelected} onClick={clickHandler}>
        ボタン
      </OrangeButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集(メディアクエリ)<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

// console.dir(styled)

const StyledButton = styled.button`
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? 'pink' : '')};

  @media (max-width: 600px) {
    border-radius: 0;
  }
`

const OrangeButton = styled(StyledButton)`
  background-color: orange;

  :hover, :active {
    color: red;
    opacity: 0.7;
  }
`

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton isSelected={isSelected} onClick={clickHandler}>
        ボタン
      </StyledButton>
      <OrangeButton isSelcted={isSelected} onClick={clickHandler}>
        ボタン
      </OrangeButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

+ `07_styling_component/src/040_css_in_js/start/Example.js`を編集(ネスト)<br>

```js:Example.js
import { useState } from 'react'
import styled from 'styled-components'

// console.dir(styled)

const StyledButton = styled.button`
  margin: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 120px;
  height: 60px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? 'pink' : '')};

  @media (max-width: 600px) {
    border-radius: 0;
  }
`

const OrangeButton = styled(StyledButton)`
  background-color: orange;

  :hover, :active {
    color: red;
    opacity: 0.7;
  }

  span {
    font-size: 2rem;
  }
`

const Example = () => {
  const [isSelected, setIsSelected] = useState(false)

  const clickHandler = () => setIsSelected((prev) => !prev)

  return (
    <>
      <StyledButton isSelected={isSelected} onClick={clickHandler}>
        ボタン
      </StyledButton>
      <OrangeButton isSelcted={isSelected} onClick={clickHandler}>
        <span>ボタン</span>
      </OrangeButton>
      <button
        className={`btn ${isSelected ? 'selected' : ''}`}
        onClick={clickHandler}
      >
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

## 78. [練習&解答] styled-components

+ `07_styling_component/src/045_practice_css_in_js/start/Example.js`を編集<br>

```js:Example.js
import styled from "styled-components";

const FirstButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  border: none;
  background: pink;
`;

const SecondButton = styled(FirstButton)`
  background: red;
  color: white;
`

const ThirdButton = styled(SecondButton)`
  background: ${({ dark }) => (dark ? 'black' : 'green')}
`

const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードと同じ状態になるようにしてください。
        <ul>
          <li>Q1. FirstButtonのbackgroudをpinkにしてください。</li>
          <li>
            Q2.
            FirstButtonを継承したSecondButtonを作成し、backgroudをredに、colorをwhiteにしてください。{" "}
          </li>
          <li>
            Q3.
            SecondButtonを継承したThirdButtonを作成し、props.darkがある場合のみbackgroudがblackに、ない場合はgreenになるようにしてください。
          </li>
        </ul>
      </p>
      <FirstButton>ボタン1</FirstButton>
      <SecondButton>ボタン2</SecondButton>
      <ThirdButton>ボタン3</ThirdButton>
      <ThirdButton dark>ボタン3</ThirdButton>
    </>
  );
};

export default Example;
```

## 79. [まとめ] Reactでのスタイルの適用方法

#### スタイリングの比較

+ CSSファイルの読み込み `import "./Example.css"`<br>

```
"CSSファイルにclassを定義して、JSXのclassNameに適用する"

特徴:
・ グローバルスコープとなるためクラス名の衝突が起きやすい

・ ルートファイル(App.js等)でグローバルなスタイルを当てたいときに使用する
```

+ インラインスタイル `style={{ color: 'red' }}`<br>

```
"JSXのstyle属性にオブジェクトを渡す"

特徴:
・ 再利用性が低い
・ 擬似要素やメディアクエリが使用できない
・ レンダリングの度に計算されるのでパフォーマンスがオ劣る
・ 動的で頻繁に計算されるスタイルの適用
```

+ CSS Modules `import styles from "./Example.module.css"`<br>

```
"CSSファイルをモジューつとしてJSファイルに読み込んで、コンポーネントごとにローカルスコープを作ってスタイルを適用する"

特徴:
・ クラス名の衝突が起きない
・ create-react-appで設定済みのため、すぐ使える
・ 将来、非推奨になる可能性がある
・ CSSとJSが2つのファイルに分かれる
```

+ CSS in JS `const StyledButton = styled.div``<br>

```
"CSSをJSファイル内に記載して、CSSを適用したコンポーネントを作成する"

特徴:
・ クラス名の衝突が起きない
・ ライブラリを導入する必要がある
・ propsを参照して動的にスタイルできる
・ 擬似要素やメディアクエリが使用できる
```
