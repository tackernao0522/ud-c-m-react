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
