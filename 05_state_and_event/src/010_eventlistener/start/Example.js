const Example = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました。')
  }
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました。')
  }

  const hello = () => 'hello react'

  return (
    <>
      <button onClick={() => { clickHandler() }}>クリックしてね</button>
      <button onClick={clickHandler2}>クリックしてね</button>
      <br />
      {hello()}
    </>
  )
}

export default Example
