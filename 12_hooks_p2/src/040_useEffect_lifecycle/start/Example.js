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
