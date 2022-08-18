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
