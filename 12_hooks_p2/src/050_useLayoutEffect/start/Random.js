import { useLayoutEffect, useState } from 'react'

const Random = () => {
  const [state, setState] = useState(0)

  useLayoutEffect(() => { // useEffectのままだと0が瞬間的にクリックする都度確認できるがuseLayoutEffectにするとそれがなくなる 画面がちらついたときんはuseLayoutEffectを使う
    if (state === 0) {
      setState(Math.random() * 300)
    }
  }, [state])

  return (
    <button
      className="effect-btn"
      onClick={() => setState(0)}
      style={{ fontSize: '2.5em' }}
    >
      state: {state}
    </button>
  )
}
export default Random
