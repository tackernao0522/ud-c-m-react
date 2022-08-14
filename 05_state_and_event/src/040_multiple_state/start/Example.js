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
