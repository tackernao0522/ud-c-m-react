## 91. [useImperativeHandle] refへのアクセスを限定する方法 (あまり使わない方が良い)

+ `useImperativeHandle`は子コンポーネントで使用する<br>

+ `08_other_function/src/050_useImperativeHandle/start/Example.js`を編集<br>

```js:Example.js
import { useRef, forwardRef, useImperativeHandle } from 'react'

/* POINT forwardRef
子コンポーネント内の DOM に直接アクセスしたいときに使います。
refは、親から子コンポーネントへprops形式で渡して参照するということができないため、
参照したい場合は子コンポーネント内でfowardRefを使用する必要があります。
*/
const Input = forwardRef((props, ref) => {
  const inputRef = useRef() // 親から渡ってきたref とここのrefでは別物になる

  // 親から渡ってきたrefを第一引数に渡す
  useImperativeHandle(ref, () => ({
    myFocus() {
      inputRef.current.focus()
      console.log('フォーカス取得')
    },
  }))
  return <input type="text" ref={inputRef} />
})

const Example = () => {
  const ref = useRef()
  return (
    <>
      <Input ref={ref} />
      <button onClick={() => ref.current.myFocus()}>
        インプット要素をフォーカスする
      </button>
    </>
  )
}

export default Example
```

## 92. [練習&解答] refの使い方

+ `08_other_function/src/060_practice_ref/start/Example.js`を編集<br>

```js:Example.js
import { useState, useRef, forwardRef, useImperativeHandle } from 'react'

const Video = forwardRef(({ path }, ref) => {
  const videoRef = useRef()

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play()
    },
    stop() {
      videoRef.current.pause()
    },
  }))

  return (
    <video style={{ maxWidth: '100%' }} ref={videoRef}>
      <source src={path}></source>
    </video>
  )
})

const Example = () => {
  const [playing, setPlaying] = useState(false)

  const ref = useRef()

  return (
    <div>
      <h3>練習問題</h3>
      <p>
        useRef、useImperativeHandle、forwardRefを使って完成系の動画再生機能を作成してください。※useImperativeHandleでplay(再生)、stop(停止)メソッドを定義すること。
      </p>
      <Video ref={ref} path="./sample.mp4" />
      <button
        onClick={() => {
          if (playing) {
            ref.current.stop()
          } else {
            ref.current.play()
          }
          setPlaying((prev) => !prev)
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}

export default Example
```
