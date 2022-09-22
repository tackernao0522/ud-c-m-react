## 96. デバッガーを使ってみよう

+ `09_debugging/src/020_debugging/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react"

const Child = (countNum) => {
  debugger // 追加
  return <p>現在のカウント数: {countNum.val}</p>
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```

+ ブラウザコンソールの`Sources`をみる<br>

+ `Step over`をクリック<br>

```
import { useState } from "react"

const Child = (countNum) => {
  debugger
  return <p>現在のカウント数: {countNum.val}</p> // undefinedとなっている
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```

+ `ESC`キーを押す(Consoleが出る)<br>

+ `Console`に`countNum.val`を入力して`Enter`する<br>

```:consle
countNum.val
undefined // undefindeになっているので画面上に表示されていなかったということになる
```

+ `Console`に`countNum`を入力して`Enter`する<br>

```:console
countNum
{count: {…}} // オブジェクトであることがわかる 受け取っているのは`count`なのにpropsは`countNum`になっている
count
: 
val
: 
0
[[Prototype]]
: 
Object
[[Prototype]]
: 
Object
```

+ `09_debugging/src/020_debugging/start/Example.js`を確認<br>

```js:Example.js
import { useState } from "react"

// propsなのに'{}'で渡っていないのがわかる
const Child = (countNum) => {
  debugger // 追加
  return <p>現在のカウント数: {countNum.val}</p>
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```

+ `09_debugging/src/020_debugging/start/Example.js`を確認<br>

```js:Example.js
import { useState } from "react"

// 編集
const Child = ({ count }) => {
  debugger
  return <p>現在のカウント数: {count.val}</p> // 編集
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```

+ `Sources`の プレイボタンマークをクリックしてみる(問題なく表示される)<br>

+ 一度ブラウザをリロードして `Sources` => `Step over`して確認すると `{count.val}の値は正常に `0`となっている<br>

+ `Sources` => `プレイボタン`をクリックすると後続のスクリプトが実行され ブラウザの `+`をクリックするとカウントされる<br>

+ 都度止まるのが面倒な場合は`Sources`の5行目にブレイクぽインを置き `Example.js`に書いた`debugger`を削除する<br>

+ ブラウザを更新する<br>

+ 今度はブレイクポイントによってコードが止まっていることになる<br>

+ 右の `Breakpoints` => `Example.js:5`のチェックを外すと一時的にブレイクポイントを外すことができる<br>

+ これでプレイボタンを押すと止まらないで実行される<br>

+ ブラウザの `+`ボタンアイコンを押した時にデバッガーが止まるようにしてみる(練習)<br>

+ `09_debugging/src/020_debugging/start/Example.js`を確認<br>

```js:Example.js
import { useState } from "react"

const Child = ({ count }) => {
  // debugger
  return <p>現在のカウント数: {count.val}</p>
}

const Example = () => {
  const [count, setCount] = useState({ val: 0 });

  const countUp = () => {
    debugger // 追加
    setCount((prevstate) => {
      const newState = { val: prevstate.val + 1 }
      return newState;
    });
  };

  return (
    <>
      <Child count={count} />
      <button onClick={countUp}>+</button>
    </>
  );
};

export default Example;
```

+ まだ countup関数は実行されていないので `+`アイコンをクリックして `countUp`関数を実行する<br>

+ `const [count, setCount] = useState({ val: 0 })`にブレイクポイントをおく<br>

+ プレイボタンをクリックする<br>

+ ブレイクポイントでコードが止まる(ハイライトされる) 更新用関数が実行されて再レンダリングが行われるためである(Exampleコンポーネントが再度実行されている)<br>

+ `Sources` => `↓`(step into)ボタンをクリックするとこの場合はブレイクポイントの`useState`の関数に入っていく<br>

+ `react.development.js`の中身が`Sources`に表示される<br>

+ 再度 `↓`をクリックすると次は `resolveDispatcher()`が呼ばれることになる<br>

+ `resolveDispatcher`のコードが実行されていることが確認できる<br>

+ `↑`(step )ボタンを押すと`return dispatcher;`のコードにより呼び出し元に戻る(一つ前の関数 useSate)<br>

+ 再度 `↑`(step out)ボタンを押すと `Exampleコンポーネント`に戻る<br>

+ `Call Stack`は元々Javascriptが実行されてきた経路になる<br>
