import { useState } from 'react'

const Example = () => {
  const personObj = { name: 'Tom', age: 18 }
  const [person, setPerson] = useState(personObj)
  const changeName = (e) => {
    console.log({ ...person } === person) // false よって新しい別のオブジェクトが生成されていることになる
    console.log({ ...person })
    setPerson({ ...person, name: e.target.value, age: 20 }) // 新しいオブジェクトが生成されることになる
  }
  const changeAge = (e) => {
    setPerson({ ...person, age: e.target.value }) // 新しいオブジェクトが生成されることになる
  }
  const reset = () => {
    setPerson({ name: '', age: '' })
  }

  return (
    <>
      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName} />
      <input type="number" value={person.age} onChange={changeAge} />
      <div>
        <button onClick={reset}>リセット</button>
      </div>
    </>
  )
}

export default Example
