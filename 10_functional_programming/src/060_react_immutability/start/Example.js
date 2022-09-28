import { useState } from 'react'

const Child = (props) => {
  // props.state = { value: 1 } エラーになる propsに保持されたプロパティは変更できないようになっている
  const { state, setState } = props
  const increment = () => {
    setState(prev => {
      const newState = { value: prev.value + 1 }
      return newState
    })
  }
  return (
    <>
      <span>{state.value}</span>
      <button onClick={increment}>+</button>
    </>
  )
}

const Example = () => {
  const [state, setState] = useState({ value: 0 })

  return (
    <>
      <div>
        <Child state={state} setState={setState} />
      </div>
    </>
  )
}

export default Example
