# セクション12: [React Hooks] useEffectとカスタムフック

## 125. useEffectとは？タイマーを作りながら学んでみよう<br>

+ `12_hooks_p2/src/010_useEffect_init/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [time, setTime] = useState(0)

  window.setInterval(() => {
    setTime((prev) => prev + 1)
  }, 1000)

  return (
    <h3>
      <time>{time}</time>
      <span>秒経過</span>
    </h3>
  )
}

export default Example
```

`＊` 上記コードだと秒数の進み方がおかしい<br>

setTime関数が常に更新され再レンダリングし続けてしまっている為、この場合の更新関数は一度だけで良い。そのために`useEffect`を使う<br>

+ `12_hooks_p2/src/010_useEffect_init/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'

const Example = () => {
  const [time, setTime] = useState(0)

  // 追加
  useEffect(() => {
    console.log('start-useEffect')
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }, []) // 空の配列を第二引数に記述することにより Exampleコンポーネントが読み込まれた時だけ動くようになる
  // ここまで

  return (
    <h3>
      <time>{time}</time>
      <span>秒経過</span>
    </h3>
  )
}

export default Example
```
