import { useState } from 'react'

const Example = () => {
  const [isChecked, setIsChecked] = useState(true)

  return (
    <>
      <p style={{ textAlign: 'center' }}>
        startフォルダの内容が表示されます。
        <br />
        練習用に使ってください！
      </p>
      <label htmlFor="my-check">チェック：</label>
      <input
        type="checkbox"
        id="mycheck"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <div>{isChecked ? 'On!' : 'OFF!'}</div>
    </>
  )
}

export default Example
