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
