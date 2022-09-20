import { useRef, useState } from 'react'

const Case1 = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef()
  // console.log(inputRef)

  return (
    <div>
      <h3>ユースケース1</h3>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => inputRef.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </div>
  )
}

const Case2 = () => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef()

  return (
    <div>
      <h3>ユースケース2</h3>
      <video style={{ maxWidth: '100%' }} ref={videoRef}>
        <source src="./sample.mp4"></source>
      </video>
      <button
        onClick={() => {
          if (playing) {
            videoRef.current.pause()
          } else {
            videoRef.current.play()
          }
          // setPlaying(!playing)
          setPlaying((prev) => !prev)
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}

const createTimeStamp = () => new Date().getTime()

const Case3 = () => {
  const [timeStamp, setValue] = useState(createTimeStamp())
  const ref = useRef(createTimeStamp())

  const updateState = () => {
    setValue(createTimeStamp())
  }

  const updateRef = () => {
    /* コンソールを見るとブラウザの表示と、ref.currentの中身が異なることを確認できます */
    ref.current = createTimeStamp()
    console.log('ref.current -> ', ref.current)
  }
  return (
    <div>
      <h3>ユースケース3</h3>
      <p>
        state: {timeStamp}
        <button onClick={updateState}>更新</button>
      </p>
      <p>
        ref: {ref.current}
        <button onClick={updateRef}>更新</button>
      </p>
    </div>
  )
}

const Example = () => {
  return (
    <>
      <Case1 />
      <Case2 />
      <Case3 />
    </>
  )
}

export default Example
