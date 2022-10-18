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

## 126. useEffectの依存配列の使い方

+ `12_hooks_p2/src/020_useEffect_update/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'

const Example = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    console.log('useEffect is called')
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }, []) // []だと一番最初だけ実行される 第2引数がないとwindow.setIntervalがuseEffectの外で実行されるのと同じになる

  // 追加
  useEffect(() => {
    console.log('updated')
  }, [time]) // [time]だとtimeが変更された時は実行される
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

```:console
useEffect is called
31updated # 1秒毎にコンソールに出力される
```

+ `12_hooks_p2/src/020_useEffect_update/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'

const Example = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    console.log('useEffect is called')
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    document.title = 'counter:' + time // 編集
  }, [time])

  return (
    <h3>
      <time>{time}</time>
      <span>秒経過</span>
    </h3>
  )
}

export default Example
```

+ ブラウザタブのタイトルの部分で1秒毎にカウンターが動いている<br>

+ `12_hooks_p2/src/020_useEffect_update/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'

const Example = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    console.log('useEffect is called')
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time) // 追加 timeが更新される毎にlocalStorageのtime-keyが動いている
    // setTime(prev => prev + 1) これを書いてしまうと再度timeの値が更新されることになるので再びコールバック関数が呼ばれてしまうことになるまたsetTime関数が呼ばれる無限ループになるので[timeと入れている場合はこれは記述してはならない
  }, [time])

  return (
    <h3>
      <time>{time}</time>
      <span>秒経過</span>
    </h3>
  )
}

export default Example
```