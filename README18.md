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

## 102. 純粋関数

+ `10_functional_programming/src/020_pure_function/start/Example.js`を編集(純粋関数である場合)<br>

```js:Example.js
const Example = () => {
  // 関数型 (純粋関数)
  // ・ fn(決まった引数) -> 決まった戻り値
  // ・ 関数外の状態 (データ)は参照・変更しない。
  // ・ 関数外に影響を及ぼさない。
  // ・ 引数で渡された値を変更しない。
  // 上記の要件を満たさない操作は「副作用」と呼ぶ。

  const val1 = 2,
    val2 = 3
  const add = (val1, val2) => {
    return val1 + val2
  }

  return (
    <>
      <h3>純粋関数</h3>
      <p>fn(決まった引数) には 決まった戻り値 を返す</p>

      <div>純粋関数:{add(val1, val2)}</div>
    </>
  )
}

export default Example
```

+ `10_functional_programming/src/020_pure_function/start/Example.js`を編集(純粋関数ではない場合 2つ目の要件ではなくなる)<br>

```js:Example.js
const Example = () => {
  // 関数型 (純粋関数)
  // ・ fn(決まった引数) -> 決まった戻り値
  // ・ 関数外の状態 (データ)は参照・変更しない。
  // ・ 関数外に影響を及ぼさない。
  // ・ 引数で渡された値を変更しない。
  // 上記の要件を満たさない操作は「副作用」と呼ぶ。

  const val1 = 2,
    val2 = 3
  const add = (val1) => { // 編集
    return val1 + val2 // val2は const val2を参照することになるため純粋ではなくなる
  }

  return (
    <>
      <h3>純粋関数</h3>
      <p>fn(決まった引数) には 決まった戻り値 を返す</p>

      <div>純粋関数:{add(val1)}</div> // 編集
    </>
  )
}

export default Example
```

+ `10_functional_programming/src/020_pure_function/start/Example.js`を編集(純粋関数ではない場合 3つ目の要件にならないので純粋ではない)<br>

```js:Example.js
const Example = () => {
  // 関数型 (純粋関数)
  // ・ fn(決まった引数) -> 決まった戻り値
  // ・ 関数外の状態 (データ)は参照・変更しない。
  // ・ 関数外に影響を及ぼさない。
  // ・ 引数で渡された値を変更しない。
  // 上記の要件を満たさない操作は「副作用」と呼ぶ。

  const val1 = 2,
    val2 = 3;
  let result; // 追加
  const add = (val1) => {
    result = val1 + val2; // 追加
    return val1 + val2
  }

  return (
    <>
      <h3>純粋関数</h3>
      <p>fn(決まった引数) には 決まった戻り値 を返す</p>

      <div>純粋関数:{add(val1)}</div>
    </>
  )
}

export default Example
```

+ `10_functional_programming/src/020_pure_function/start/Example.js`を編集(純粋関数ではない場合 3つ目の要件にならないので純粋ではない)<br>

```js:Example.js
const Example = () => {
  // 関数型 (純粋関数)
  // ・ fn(決まった引数) -> 決まった戻り値
  // ・ 関数外の状態 (データ)は参照・変更しない。
  // ・ 関数外に影響を及ぼさない。
  // ・ 引数で渡された値を変更しない。
  // 上記の要件を満たさない操作は「副作用」と呼ぶ。

  const val1 = 2,
    val2 = 3;
  let result;
  const add = (val1) => {
    console.log(val1); // このような場合も副作用となり純粋ではなくなる
    result = val1 + val2;
    return val1 + val2
  }

  return (
    <>
      <h3>純粋関数</h3>
      <p>fn(決まった引数) には 決まった戻り値 を返す</p>

      <div>純粋関数:{add(val1)}</div>
    </>
  )
}

export default Example
```
