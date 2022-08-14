import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
    setCount(prevstate => prevstate + 1 )
    console.log(count) // 最初のクリックは '0'と表示される
  }
  const countDown = () => {
    setCount(count - 1)
  }

  return (
    <>
      <p>{`現在のカウント数: ${count}`}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  )
};

export default Example;
