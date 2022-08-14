# セクション5: イベントリスナと状態管理（State）

## 41. イベントに合わせて関数を実行してみよう

+ `010_eventlistener/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました。');
  }
  return (
    <>
      <button onClick={clickHandler}>クリックしてね</button>
      <button>クリックしてね</button>
    </>
  );
};

export default Example;
```

+ `010_eventlistener/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました。')
  }
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました。')
  }
  return (
    <>
      <button onClick={clickHandler}>クリックしてね</button>
      <button onClick={clickHandler2}>クリックしてね</button>
    </>
  )
}

export default Example
```

+ `010_eventlistener/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  // const clickHandler = () => {
  //   alert('ボタンがクリックされました。')
  // }
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました。')
  }
  return (
    <>
      <button
        onClick={() => {
          alert('ボタンがクリックされました。')
        }}
      >
        クリックしてね
      </button>
      <button onClick={clickHandler2}>クリックしてね</button>
    </>
  )
}

export default Example
```

+ `010_eventlistener/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました。')
  }
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました。')
  }

  const hello = () => 'hello react'

  return (
    <>
      <button onClick={clickHandler}>クリックしてね</button>
      <button onClick={clickHandler2}>クリックしてね</button>
      <br />
      {hello()} // hello react
    </>
  )
}

export default Example
```

+ `010_eventlistener/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました。')
  }
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました。')
  }

  const hello = () => 'hello react'

  return (
    <>
      <button onClick={() => { clickHandler() }}>クリックしてね</button> // この場合 ()は必須
      <button onClick={clickHandler2}>クリックしてね</button>
      <br />
      {hello()}
    </>
  )
}

export default Example
```

## 42. 開発でよく利用するイベントタイプ

+ `015_other_events/start/Example.js`を編集<br>

```js:Example.js
import "./Example.css";

const Example = () => {
  return (
    <div>
      <h3>コンソールを確認してください。</h3>
      <label>
        入力値のイベント：
        {/* onBlur = フォーカスから外れたときに発火するイベント */}
        {/* onFocus = フォーカスが当たったときに発火するイベント */}
        <input
          type="text"
          onChange={() => console.log("onChange検知")}
          onBlur={() => console.log("onBlur検知")}
          onFocus={() => console.log("onFocus検知")}
        />
      </label>
      {/* <div>
        <label>
          入力値を取得：
          <input type="text" onChange={(e) => console.log(e.target.value)} />
        </label>
      </div> */}
      {/* <div
        className="hover-event"
        onMouseEnter={() => console.log("カーソルが入ってきました。")}
        onMouseLeave={() => console.log("カーソルが出ていきました。")}
      >
        ホバーしてね！
      </div> */}
    </div>
  );
};

export default Example;
```

+ `015_other_events/start/Example.js`を編集<br>

```js:Example.js
import "./Example.css";

const Example = () => {
  return (
    <div>
      <h3>コンソールを確認してください。</h3>
      <label>
        入力値のイベント：
        {/* onBlur = フォーカスから外れたときに発火するイベント */}
        {/* onFocus = フォーカスが当たったときに発火するイベント */}
        <input
          type="text"
          onChange={() => console.log("onChange検知")}
          onBlur={() => console.log("onBlur検知")}
          onFocus={() => console.log("onFocus検知")}
        />
      </label>
      <div>
        <label>
          入力値を取得：
          <input type="text" onChange={(e) => console.log(e.target.value)} />
        </label>
      </div>
      {/* <div
        className="hover-event"
        onMouseEnter={() => console.log("カーソルが入ってきました。")}
        onMouseLeave={() => console.log("カーソルが出ていきました。")}
      >
        ホバーしてね！
      </div> */}
    </div>
  );
};

export default Example;
```

+ `015_other_events/start/Example.js`を編集<br>

```js:Example.js
import "./Example.css";

const Example = () => {
  return (
    <div>
      <h3>コンソールを確認してください。</h3>
      <label>
        入力値のイベント：
        {/* onBlur = フォーカスから外れたときに発火するイベント */}
        {/* onFocus = フォーカスが当たったときに発火するイベント */}
        <input
          type="text"
          onChange={() => console.log("onChange検知")}
          onBlur={() => console.log("onBlur検知")}
          onFocus={() => console.log("onFocus検知")}
        />
      </label>
      <div>
        <label>
          入力値を取得：
          <input type="text" onChange={(e) => console.log(e.target.value)} />
        </label>
      </div>
      <div
        className="hover-event"
        onMouseEnter={() => console.log("カーソルが入ってきました。")}
        onMouseLeave={() => console.log("カーソルが出ていきました。")}
      >
        ホバーしてね！
      </div>
    </div>
  );
};

export default Example;
```

※ JavaScriptの onchangeはFocusから外れたときに発火する oninputは変更があったときに発火する<br>
※ Reactの onChangeはJaveScriptの oninputと同じ挙動である違いがある<br>

## 43. イベントに合わせて画面表示を更新してみよう

+ `020_useState/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const valArry = useState('hello')
  // console.log(valArry)

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          const setFn = valArry[1]
          setFn(e.target.value)
        }}
      />{' '}
      = {valArry[0]}
    </>
  )
}

export default Example
```

+ `020_useState/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [val, setVal] = useState()

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setVal(e.target.value)
        }}
      />{' '}
      = {val}
    </>
  )
}

export default Example
```
## 44. [重要] ステートとは？

復習しておく<br>

## 45. [重要] ステートとレンダリングの仕組み

+ `05_state_and_event/src/src/030_useState_render/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  // let displayVal;
  let [ val, setVal ] = useState();
  console.log('再レンダリングされました');
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          console.log(e.target.value);
          setVal(e.target.value);
          // displayVal = e.target.value;
        }}
      />
      = {val}
    </>
  );
};

export default Example;
```

※ useStateが実行されるたびにExample関数が実行される<br>

## 46. [複数のステート] ステート使用時の注意点！

+ `05_state_and_event/src/src/040_multiple_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(10)
  const [countC, setCountC] = useState(100)

  return (
    <>
      <p>{`ボタンAを${countA}回押しました！`}</p>
      <button
        onClick={() => {
          setCountA(countA + 1)
        }}
      >
        ボタンA
      </button>
      <p>{`ボタンBを${countB}回押しました！`}</p>
      <button
        onClick={() => {
          setCountB(countB + 1)
        }}
      >
        ボタンB
      </button>
      <p>{`ボタンCを${countC}回押しました！`}</p>
      <button
        onClick={() => {
          setCountC(countC + 1)
        }}
      >
        ボタンC
      </button>
    </>
  )
}

export default Example
```

+ `05_state_and_event/src/src/040_multiple_state/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  console.log(<Example />)
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(10)
  const [countC, setCountC] = useState(100)

  return (
    <>
      <p>{`ボタンAを${countA}回押しました！`}</p>
      <button
        onClick={() => {
          setCountA(countA + 1)
        }}
      >
        ボタンA
      </button>
      <p>{`ボタンBを${countB}回押しました！`}</p>
      <button
        onClick={() => {
          setCountB(countB + 1)
        }}
      >
        ボタンB
      </button>
      <p>{`ボタンCを${countC}回押しました！`}</p>
      <button
        onClick={() => {
          setCountC(countC + 1)
        }}
      >
        ボタンC
      </button>
    </>
  )
}

export default Example
```
