## 53. ステートとコンポーネントの関係

+ `05_state_and_event/src/070_state_and_component/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  return (
    <>
      // それぞれ独立したStateを持っている(連動しない)
      <Count />
      <Count />
    </>
  )
}

const Count = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>カウント: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

+ `05_state_and_event/src/070_state_and_component/start/Example.js`を編集(AとBのカウントが連動している)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [toggle, setToggle] = useState(true)
  const toggleComponent = () => {
    setToggle(prev => !prev)
  }

  return (
    <>
      <button onClick={toggleComponent}>toggle</button>
      {toggle ? (
        <Count title="A" />
      ) : (
        <Count title="B" />
      )}
    </>
  )
}

const Count = ({ title }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>{title}: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

+ `05_state_and_event/src/070_state_and_component/start/Example.js`を編集(AとBのカウントが連動していない)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [toggle, setToggle] = useState(true)
  const toggleComponent = () => {
    setToggle(prev => !prev)
  }

  return (
    <>
      <button onClick={toggleComponent}>toggle</button>
      {toggle ? (
        <Count title="A" />
      ) : (
        // 新しいツリーとして認識される
        <div>
          <Count title="B" />
        </div>
      )}
    </>
  )
}

const Count = ({ title }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>{title}: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

+ `05_state_and_event/src/070_state_and_component/start/Example.js`を編集(Bだけが初期化される)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [toggle, setToggle] = useState(true)
  const toggleComponent = () => {
    setToggle(prev => !prev)
  }

  return (
    <>
      <button onClick={toggleComponent}>toggle</button>
      {/* {toggle ? (
        <Count title="A" />
      ) : (
        <div>
          <Count title="B" />
        </div>
      )} */}
      <Count title="A" />
      {toggle && <Count title="B" />} // falseになるとこのツリーは消滅して trueになると新たにツリーが生成されることになる
    </>
  )
}

const Count = ({ title }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>{title}: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

+ `05_state_and_event/src/070_state_and_component/start/Example.js`を編集(全てのStateはリセットされる)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [toggle, setToggle] = useState(true)
  const toggleComponent = () => {
    setToggle(prev => !prev)
  }

  return (
    <>
      <button onClick={toggleComponent}>toggle</button>
      // keyをつける
      {toggle ? (
        <Count key="A" title="A" />
      ) : (
        <Count key="B" title="B" />
      )}
      {/* <Count title="A" />
      {toggle && <Count title="B" />} */}
    </>
  )
}

const Count = ({ title }) => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>{title}: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

## 54. ステートを複数のコンポーネントで管理しよう！

+ `05_state_and_event/src/080_state_and_props/start/Example.js`を編集(コンポーネントが消滅した後も値を保持し続ける方法)<br>

```js:Example.js
import { useState } from "react";


const Example = () => {
  // 親からStateを渡す
  const [toggle, setToggle] = useState(true);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const toggleComponent = () => {
    setToggle(prev => !prev);
  }
  return (
    <>
      <button onClick={toggleComponent}>toggle</button>
      {toggle ? (
        <Count
          key="A"
          title="A"
          count={countA}
          setCount={setCountA}
        />
      ) : (
        <Count
          key="B"
          title="B"
          count={countB}
          setCount={setCountB}
        />
      )}
    </>
  )
}
const Count = ({ title, count, setCount }) => {
  const countUp = () => {
    setCount((prevstate) => prevstate + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };
  return (
    <>
      <h3>{title}: {count}</h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```

## 55. [練習] ステートの受け渡し

+ `05_state_and_event/src/090_practice_state_props/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>練習問題</h3>
      <p>カウントの更新（CountUpdate）と表示（CountResult）を別のコンポーネントに分離してください。Exampleコンポーネント内で現在のカウントの値を管理するstateを一つ定義してこれまでのレクチャーで実装したようなカウンターを作成してください。</p>
      <CountResult title="カウント" count={count} />
      <CountUpdate setCount={setCount} />
    </>
  );
};

const CountResult = ({ count, title }) => <h3>{title}:{count}</h3>

const CountUpdate = ({ setCount }) => {
  const countUp = () => {
    setCount((prevstate) => prevstate + 1)
  };
  const countDown = () => {
    setCount((prevstate) => prevstate - 1)
  };
  return (
    <>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
```