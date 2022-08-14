import { useState } from "react";

const Example = () => {
  const numArray = [1, 2, 3, 4, 5];
  const [nums, setNums] = useState(numArray)
  const shuffle = () => {
    const newNums = [...nums]
    // console.log(nums === newNums) // false
    const value = newNums.pop() // 最後尾の番号
    newNums.unshift(value)
    // console.log(newNums) // [5, 1, 2, 3, 4]
    setNums(newNums)
  }
  return (
    <>
      <h1>{nums}</h1>
      <button onClick={shuffle}>shuffle</button>
    </>
  );
};

export default Example;
