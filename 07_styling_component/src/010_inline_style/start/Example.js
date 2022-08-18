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
