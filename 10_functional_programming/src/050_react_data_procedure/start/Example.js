import { useState } from "react";

/*
状態管理と処理を分離
*/

// let val = 0 // 使用しない(関数の外の変数のため)

const Example = () => {
  // JSXを作成する場所
  const [ state, setState ] = useState(0);
  const increment = () => {
    setState(state + 1);
  }
  // window.alert('hello') // このような処理もReactでは行わない(副作用と呼ばれる useEffect()などを使って代用することとなる)

  return (
    <>
      <button onClick={increment}>+</button>
      <h3>{state}</h3>
    </>
  );
};

export default Example;
