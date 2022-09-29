import { useReducer, useState } from 'react'

const Example = () => {
  // useReducerはuseStateに書き換えに使用
  const [state, setState] = useState(0)

  // rstateとstateの更新を個別でできるようになる
  // const [rstate, dispatch] = useReducer((state, action) => {
  //   if (action === '+') {
  //     return state + 1 // ++state
  //   } else if (action === '-') {
  //     return state - 1 // --state
  //   }
  // }, 0)

  const [rstate, dispatch] = useReducer((prev, { type, step }) => {
    switch (type) {
      case '+':
        return prev + step
      case '-':
        return prev - step
      default:
        throw new Error('不明なアクションです。')
    }
    // if (action === '+') {
    //   return ++prev // prev + 1
    // } else if (action === '-') {
    //   return --prev // prev + 1
    // }
  }, 0)

  // const countUp = () => setState(state => state + 1)
  const countUp = () => setState((prev) => ++prev)

  const rcountUp = () => {
    dispatch({ type: "+", step: 2 })
  }

  const rcountDown = () => {
    dispatch({ type: "-", step: 3 })
  }

  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  )
}

export default Example
