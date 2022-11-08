# セクション14: クラスコンポーネント

## 151. クラスコンポーネントとは？

### Reactのコンポーネント

#### コンポーネントの定義方法は大きく分けて二つある

  + `関数コンポーネント`<br>
      JSの関数として定義。本コースで今まで登場したものは全て関数コンポーネント<br>

  + `クラスコンポーネント`<br>
      JS(ES6)のクラスとして定義。本セクションで学ぶ<br>

### コンポーネントの定義方法の変化

  React16.8より追加されていたHooksという新機能（2019年）登場によってコンポーネントの定義方法が大きく変わった。<br>

  `登場前` クラスコンポーネントがメイン<br>

          ↓

  `登場後` 関数コンポーネント + Hooks (公式推奨、本コースでも一貫して関数コンポーネント)<br>

### Hooksの登場前のReact

  + 状態の管理やライフサイクルを利用するにはクラスコンポーネントを使用する必要があった。<br>

  + 関数コンポーネントは存在したがstateを管理できず、データを受け取って表示するだけなどの単純なコンポーネントにしか使えなかった。=> Hooks登場まえはクラスコンポーネントがメイン<br>

### なぜクラスコンポーネントを学ぶのか？

  + クラスコンポーネントが多用されている過去のプロジェクトに参加している、上来する可能性がある<br>
  + 既存のシステムの改修の携わる可能性がある
  + クラスコンポーネントにしか対応していないライブラリを使用したい<br>
  + Reactの理解を深めたい<br>

  ↓<br>

  これらに当てはまらない場合はスキップ可<br>

### クラスコンポーネントの問題点

`問題点1`<br>
  __共通のステートフルなロジックの再利用が難しい__<br>

  高階コンポーネントやレンダープロップという設計パターンで、共通のロジックを分離して、ビュー（見た目）を担当するコンポーネントと合成することで関心を分離する。<br>

  ↓<br>

  分離のたびにコンポーネントの再構成が必要であり、万灯な上にコードが追いにくくなる<br>

`問題点2`<br>
  __ステートの管理が複雑なコンポーネントは保守性が低い__<br>

  コンポーネントが複雑になると、ステートフルなロジックや副作用に関するロジックがコンポーネント内の至る場所に存在してしまい分散してしまう。<br>

  ↓<br>

  コンポーネントが複雑かし分割も困難になる。<br>
  無理に分割しようとすると問題点1が発生する。<br>

`問題点3`<br>
  __JSのClass構文は混乱を招き、関数に比べて可読性も低い。__<br>

  JavaScriptのClass構文のthisやbindなどの独特な構文を理解して意識する必要がある。<br>

  ↓<br>

  コードの可読性が下がり、冗長になる。<br>

### クラスコンポーネントの問題点まとめ

  ① ステートフルな共通のロジックの再利用が難しい<br>
  ② ステートの管理が複雑になると保守性が下がる<br>
  ③ そもそもJSのクラスが混乱を招きやすく可読性が低い<br>

  ↓<br>

  これらの問題を解決するため、Hooksが導入された<br>

## 152. クラスコンポーネントを定義してみよう

+ `14_class_components/src/010_introduce/start/Example.js`を編集<br>

```js:Example.js
import { Component } from 'react' // 追加

// 追加
class Example extends Component {
  render() {
    return <h3>I'm Function Component</h3>
  }
}
// ここまで

// const Example = () => {
//   return (
//     <h3>I'm Function Component</h3>
//   );
// };

export default Example
```

## 153. クラスコンポーネントでの状態管理

+ `14_class_component/src/030_state/start/Example.js`を編集<br>

```js:Example.js
import { Component } from 'react' // 追加

// 追加
class SwitchButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchOn: true,
      label: 'On',
    }
  }

  changeSwitch() {
    console.log('clicked')
  }

  render() {
    const { label } = this.state
    return <button onClick={this.changeSwitch}>{label}</button>
  }
}
// ここまで

const Example = () => {
  return (
    <>
      <SwitchButton />
    </>
  )
}

export default Example
```

+ `14_class_component/src/030_state/start/Example.js`を編集<br>

```js:Example.js
import { Component } from 'react'

class SwitchButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchOn: true,
      label: 'On',
    }
  }

  // 追加
  changeSwitch() {
    // console.log('clicked')
    // console.log(this) // undefinedになる bindすると取得できる // 追加

    this.setState((prevState) => {
      return {
        switchOn: !prevState.switchOn,
        label: !prevState.switchOn ? 'On' : 'Off',
      }
    })
  }
  // ここまで

  render() {
    const { label } = this.state
    return <button onClick={this.changeSwitch.bind(this)}>{label}</button> // 編集
  }
}

const Example = () => {
  return (
    <>
      <SwitchButton />
    </>
  )
}

export default Example
```

+ `14_class_component/src/030_state/start/Example.js`を編集<br>

```js:Example.js
import { Component } from 'react'

class SwitchButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchOn: true,
      label: 'On',
    }
    this.changeSwitch = this.changeSwitch.bind(this) // 追加
  }

  changeSwitch() {
    // console.log('clicked')
    // console.log(this) // undefinedになる bindすると取得できる

    this.setState((prevState) => {
      return {
        switchOn: !prevState.switchOn,
        label: !prevState.switchOn ? 'On' : 'Off',
      }
    })
  }

  render() {
    const { label } = this.state
    return <button onClick={this.changeSwitch}>{label}</button> // 編集
  }
}

const Example = () => {
  return (
    <>
      <SwitchButton />
    </>
  )
}

export default Example
```

## 154. ライフサイクルメソッドとは？

### コンポーネントのライフサイクルとは？

  __コンポーネントの一生には３つの段階がある。__<br>

  `Mounting`  `Updating`  `Unmounting`<br>

  それぞれの段階で特別なメソッドが用意されており、特定のタイミングで実行させることができる。<br>

### 主なライフサイクルメソッド

`Mounting`<br>
    componentDidMount()<br>
    1回目のrender()が呼ばれ、DOMがレンダーされた後に一度だけ実行される。<br>

`Updating`<br>
    componentDidUpdate()
    stateが更新された直後に実行される。<br>

`Unmounting`<br>
    componentwillUnmount()<br>
    コンポーネントが破棄される直前に実行される。<br>

+ 参考: [Classコンポーネントのライフサイクル](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)<br>

### ライフサイクルメソッドとuseEffectの比較

|クラスコンポーネント|関数コンポーネント|
|:---:|:---:|
|componentDidMount()|useEffect(..., [])|
|componentDidUpdate()|useEffect(..., [val])|
|componentWillUnmount()|useEffect(() => { return () => {...}, [] })|
