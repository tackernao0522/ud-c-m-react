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