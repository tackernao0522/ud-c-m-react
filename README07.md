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