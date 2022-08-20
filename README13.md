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