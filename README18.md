# セクション10: [発展] 関数型プログラミング

## 100. 関数型プログラミングとは

### 関数型プログラミングの重要なキーワード

+ (値の) 状態管理と処理を分離 : 状態と処理は切り離す(useStateなど)<br>

+ 純粋関数 (副作用を排除する) : 特定の入力には特定の出力を返す<br>

+ 普遍性 (Immutablility) : 一度設定した値は書き換えない<br>

## 101. 状態と処理の分離

+ `10_functional_programming/src/010_data_procedure/start/Example.js`を編集(オブジェクト指向型)<br>

```js:Example.js
const Example = () => {
  // 関数型
  // （値の）状態と処理を分離して管理
  // A(data) -> B(data) -> C(data) -> 結果
  // ★ 状態と処理は切り離す

  // オブジェクト指向型
  // 状態（データ）と処理を対で管理
  // obj.method(); -> 結果
  // 追加
  const numObj = {
    nums: [1, 2, 3],
    sum() {
      const nums = this.nums
      let sumValue = 0
      for (let i = 0; i < nums.length; i++) {
        sumValue += nums[i]
      }
      return sumValue
    },
  }
  // ここまで

  return (
    <>
      <h3>状態管理と処理を分離</h3>
      <p>状態（データ）と処理（やりたいこと）は切り離す</p>

      <div>オブジェクト指向型:{numObj.sum()}</div> // 追加
      <div>関数型:</div>
    </>
  )
}

export default Example
```

+ `10_functional_programming/src/010_data_procedure/start/Example.js`を編集(関数型)<br>

```js:Example.js
const Example = () => {
  // 関数型
  // （値の）状態と処理を分離して管理
  // A(data) -> B(data) -> C(data) -> 結果
  // ★ 状態と処理は切り離す
  // 追加
  const nums = [1, 2, 3]
  const sum = (arry) => {
    const nums = arry
      let sumValue = 0
      for (let i = 0; i < nums.length; i++) {
        sumValue += nums[i]
      }
      return sumValue
  }
  // ここまで

  // オブジェクト指向型
  // 状態（データ）と処理を対で管理
  // obj.method(); -> 結果
  const numObj = {
    nums: [1, 2, 3],
    sum() {
      const nums = this.nums
      let sumValue = 0
      for (let i = 0; i < nums.length; i++) {
        sumValue += nums[i]
      }
      return sumValue
    },
  }

  return (
    <>
      <h3>状態管理と処理を分離</h3>
      <p>状態（データ）と処理（やりたいこと）は切り離す</p>

      <div>オブジェクト指向型:{numObj.sum()}</div>
      <div>関数型:{sum(nums)}</div> // 追加
    </>
  )
}

export default Example
```

+ `const sum` の中は関数型になっていないそこも関数型にしてみる<br>

+ `10_functional_programming/src/010_data_procedure/start/Example.js`を編集(関数型)<br>

```js:Example.js
const Example = () => {
  // 関数型
  // （値の）状態と処理を分離して管理
  // A(data) -> B(data) -> C(data) -> 結果
  // ★ 状態と処理は切り離す
  const nums = [1, 2, 3]
  const sum = (arry) => {
    const nums = arry
      let sumValue = 0
      // for (let i = 0; i < nums.length; i++) {
      //   sumValue += nums[i]
      // }
      // 編集
      nums.forEach(num => sumValue += num) // これでも厳密には関数型では書けていない
      // ここまで
      return sumValue
  }

  // オブジェクト指向型
  // 状態（データ）と処理を対で管理
  // obj.method(); -> 結果
  const numObj = {
    nums: [1, 2, 3],
    sum() {
      const nums = this.nums
      let sumValue = 0
      for (let i = 0; i < nums.length; i++) {
        sumValue += nums[i]
      }
      return sumValue
    },
  }

  return (
    <>
      <h3>状態管理と処理を分離</h3>
      <p>状態（データ）と処理（やりたいこと）は切り離す</p>

      <div>オブジェクト指向型:{numObj.sum()}</div>
      <div>関数型:{sum(nums)}</div>
    </>
  )
}

export default Example
```

+ `10_functional_programming/src/010_data_procedure/start/Example.js`を編集(関数型)<br>

```js:Example.js
const Example = () => {
  // 関数型
  // （値の）状態と処理を分離して管理
  // A(data) -> B(data) -> C(data) -> 結果
  // ★ 状態と処理は切り離す
  const nums = [1, 2, 3]
  const sum = (arry) => arry.reduce((accu, curr) => accu + curr) // 編集

  // オブジェクト指向型
  // 状態（データ）と処理を対で管理
  // obj.method(); -> 結果
  const numObj = {
    nums: [1, 2, 3],
    sum() {
      const nums = this.nums
      let sumValue = 0
      for (let i = 0; i < nums.length; i++) {
        sumValue += nums[i]
      }
      return sumValue
    },
  }

  return (
    <>
      <h3>状態管理と処理を分離</h3>
      <p>状態（データ）と処理（やりたいこと）は切り離す</p>

      <div>オブジェクト指向型:{numObj.sum()}</div>
      <div>関数型:{sum(nums)}</div>
    </>
  )
}

export default Example
```
