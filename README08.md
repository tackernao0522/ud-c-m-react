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

## 48. [練習] ステートの処理を自分で記述してみよう

+ `05_state_and_event/src/055_practice_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

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
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードのように+と-ボタンをクリックすると現在のカウント数が1ずつ増減する機能を実装してください。*useStateを用いてcountとsetCountを定義してください。
      </p>
      <p>現在のカウント数: {count}</p>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```