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

## 97. React Developer Toolsの使い方

### components

+ `<>`の部分の`View souce for this element`を押すとソースコードが確認できる<br>

+ `目玉みたいなマーク`(Inspect the matching DOM element)を押すとHTML上のどのDOMに位置するのかというのを確認することができる<br>

+ `歯車マーク`を押して => `Highlight updates when components render.`にチェックを入れるとレンダリングが発生したコンポーネントがブラウザに青い枠線で表示される(不必要なレンダリングが発生していないか確認したりする)<br>

+ `09_debugging/src/030_devtool_reminder/start/Example.js`を編集<br>

### Profiler

+ どのコンポーネントのレンダリングにどのくらいの時間がかかったのか表すタグになる<br>

+ ●ボタンを押すとRecoredが開始され、`完了`をクリックして ●ボタンを押して停止する<br>

+ 薄い灰色になっている場所は再レンダリングが発生しなかった場所になる<br>

+ `Todo`や`List`部分のグラフをクリックするとどれくらいの秒数がかかったとか表示されるようになっている<br>

+ ●をクリックして`完了`をクリックして`111`を入力してみる ●をクリックして停止すると 棒グラフが５個表示されていて再レンダリングが5回行われたことがわかる<br>

+ この時に変更された内容が閲覧できる<br>

## 98. Google検索の仕方

+ `mutataion observer`で検索<br>

+ `mutataion observer after:2021`で検索(2021年以降の記事が検索される)で検索<br>

+ https://developer.mozilla.org/ja/docs/Web/API/MutationObserver の MDNのみのサイトを表示したい場合には<br>

+ `mutation observer site:https://developer.mozilla.org` として検索してみる(MDNのサイトの記事のみ抜粋される)<br>

+ 逆にsiteを含めたくない場合には `mutation observer -site:https://developer.mozilla.org` と `-site`にして検索をかける(MDNのサイト関係がフィルターされる)<br>

+ キーワードで関連させる `mutation observer -JavaScript`と検索(JavaScriptという検索キーワードは除外される)<br>

+ 必ず含めたいキーワードの場合 `mutation observer "tommorow" で検索<br>

+ ブラウザコンソールを出して<br>

```:console
"".someFn() // Enter これはエラーを出すための例である

VM474:1 Uncaught TypeError: "".someFn is not a function // このエラーメッセージを検索したい場合
    at <anonymous>:1:4
```

+ `Uncaught TypeError: * is not a function` ワイルドカードを入れて検索する<br>
