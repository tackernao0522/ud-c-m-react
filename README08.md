## 47. [更新は即時ではない] ステート使用上の注意点！

+ `05_state_event/src/050_prev_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
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
```

+ `05_state_event/src/050_prev_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1) // この時点でのcountは0
    setCount(count + 1) // この時点でのcountも0になる 延々と0になる
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
```

+ `05_state_event/src/050_prev_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
    setCount(prevstate => prevstate + 1 ) // count + 2になる
    console.log(count)
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
```