import { useState } from 'react'
import '../end/Example.css'
import Child from './Child'

const Example = () => {
  console.log('Parent render')
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)
  return (
    <>
      <h3>再レンダリング</h3>
      <p>
        親コンポーネントが再レンダリングされると子コンポーネントも再レンダリングされる
      </p>
      <p>コンソールを要確認</p>
      <div className="parent">
        <div>
          <h3>親コンポーネント領域</h3>
          <div>
            <button
              onClick={() => {
                setCountA((pre) => pre + 1)
              }}
            >
              ボタンA
            </button>
            <span>親のstateを更新</span>
          </div>
          <div>
            <button
              onClick={() => {
                setCountB((pre) => pre + 1)
              }}
            >
              ボタンB
            </button>
            <span>子のpropsに渡すstateを更新</span>
          </div>
        </div>
        <div>
          <p>ボタンAクリック回数：{countA}</p>
        </div>
        <Child countB={countB} />
      </div>
    </>
  )
}

export default Example
