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
