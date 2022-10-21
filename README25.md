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

## 127. [練習&解答] useEffect

+ `12_hooks_p2/src/025_practice_useEffect/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'

const Example = () => {
  const [checked, setChecked] = useState(false)

  // 追加
  useEffect(() => {
      checked && window.alert('checked!')
  }, [checked])
  // ここまで

  return (
    <>
      <h3>練習問題</h3>
      <p>
        記述を変更し、完成コードのように、checkedがtrueの場合のみalertで「checked!」と表示されるようにしてください。useEffectを用いて実装してください。
      </p>
      <label>
        <input
          type={'checkbox'}
          value={checked}
          onClick={() => setChecked((checked) => !checked)}
        />
        click me
      </label>
    </>
  )
}

export default Example
```

## 128. useEffectのクリーンアップ処理の使い方

+ `12_hooks_p2/030_useEffect_cleanup/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'
const Example = () => {
  const [isDisp, setIsDisp] = useState(true) // 表示するかしないかの関数

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>トグル</button> // この時に呼ばれるのがコールバック関数となってくる
    </>
  )
}
const Timer = () => {
  const [time, setTime] = useState(0)

  // 依存配列[]を渡さなかったパターンの挙動
  useEffect(() => {
    console.log('init');
    window.setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
    return () => {
      console.log('end'); // Timerコンポーネントが消滅する際に実行される
    }
  }, [])

  // 依存配列[time]を渡したパターンの挙動 依存配列 timeの値が更新されるとコールバック関数が呼ばれるがこのコールバック関数が呼ばれる前にreturnに登録された関数が呼ばれることになる
  useEffect(() => {
    console.log('updated')
    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      debugger
      console.log('updated end')
    }
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

+ debuggerを置いて画面を更新するコンソールを確認すると`updated`が呼ばれているplay buttonを進めるとupdated endが呼ばれてから次のupdatedが呼ばれる依存配列の場合は`updated end` <-> `updated end`を繰り返す。<br>

+ 要は`updated`の処理を初期化するように`updated end`が呼ばれるようになるイメージである そのあとまた新しい`updated`が呼ばれる<br>

+ この処理は`clean up`と呼ばれる<br>

+ `12_hooks_p2/030_useEffect_cleanup/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'
const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>トグル</button>
    </>
  )
}
const Timer = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    // console.log('init')
    window.setInterval(() => { // この関数が実行されるとconsole.logが表示される トグルをクリックしてもこの関数は一度登録してることによって動き続けているこれがメモリーリークに繋がる。
    // このような場合にreturnのclean up 関数を使用して後始末をしてあげる。
      console.log('interval called') // 追加
      setTime((prev) => prev + 1)
    }, 1000)
    return () => {
      // console.log('end')
    }
  }, [])

  useEffect(() => {
    // console.log('updated')
    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger 削除
      // console.log('updated end')
    }
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

+ `12_hooks_p2/030_useEffect_cleanup/start/Example.js`を編集<br>

```js:Example.js
import { useEffect, useState } from 'react'
const Example = () => {
  const [isDisp, setIsDisp] = useState(true)

  return (
    <>
      {isDisp && <Timer />}
      <button onClick={() => setIsDisp((prev) => !prev)}>トグル</button>
    </>
  )
}
const Timer = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    // console.log('init')
    let intervalId = null // cleanupのための準備
    intervalId = window.setInterval(() => { // 編集
      console.log('interval called')
      setTime((prev) => prev + 1)
    }, 1000)
    return () => {
      window.clearInterval(intervalId) // windowオブジェクトにclearInterval関数があるその引数に`intervalIdを渡す
      // これでトグルを押してクリアされると`interval called`コールバックは呼ばれなくなる
      // console.log('end')
    }
  }, [])

  useEffect(() => {
    // console.log('updated')
    document.title = 'counter:' + time
    window.localStorage.setItem('time-key', time)

    return () => {
      // debugger
      // console.log('updated end')
    }
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

## 129. useEffectの実行タイミングをおさらいしよう

+ `12_hooks_p2/src/040_useEffect_lifecycle/start/Example.js`を編集<br>

```js:Example.js
// POINT useEffectの実行タイミング

import { useEffect, useState } from 'react'

const Example = () => {
  const [state, setState] = useState(0)

  useEffect(
    function update() {
      console.log('update') // ③

      return function cleanUp() {
        // ここも実行される
        console.log('update cleanup') // ②
      }
    },
    [state], // stateが更新されたときに "update"が呼ばれる
  )

  useEffect(() => {
    console.log('mount')

    return () => {
      console.log('mount cleanup') // 他のレクチャーに移行したときにここだけ呼ばれる "mount"が呼ばれない
    }
  }, [])

  console.log('render') // 一番最初に呼ばれる

  return (
    <>
      <h3>useEffectの呼ばれるタイミングをコンソールで確認してみよう</h3>
      <button onClick={() => setState((prev) => prev + 1)}>更新</button>
      <h3>他のレクチャーを選ぶとunmountが呼ばれます。</h3>
    </>
  )
}

export default Example
```
