import { memo } from 'react'

function areEqual(prevProps, nextProps) {
  if (prevProps.countB !== nextProps.countB) {
    return false // 再レンダリング
  } else {
    return true // 再レンダリング発生なし
  }
  /*
  nextPropsをrenderに渡した結果が
  prevPropsをrenderに渡した結果となる時にtrueを返し
  それイア外の時にfalseを返す
  */
}

const ChildMemo = memo(({ countB }) => {
  console.log('%cChild render', 'color: red;')

  return (
    <div className="child">
      <h2>子コンポーネント領域</h2>
      <span>ボタンBクリック回数：{countB}</span>
    </div>
  )
}, areEqual)

export default ChildMemo
