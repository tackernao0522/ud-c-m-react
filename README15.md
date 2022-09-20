# セクション8: ReactでDOM操作を行う方法

## 84. [createPortal] モーダルの作り方

### ポータル(Portal)

```
ポータルの子要素を、直接の親要素ではなく別のDOM要素にマウントすることができる。
```

+ `08_other_function/src/010_prtals/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";
import Modal from "./components/Modal";
import { createPortal} from "react-dom" // 追加

/* POINT createPortalの使い方
第一引数: React の子要素としてレンダー可能なもの （要素、文字列、フラグメント、コンポーネントなど）
第二引数: レンダー先のDOM要素
*/

/* POINT createPortalはどんなときに使うか？
子要素は親要素のスタイルによって表示に制限を受ける場合があります。
（overflow: hidden 、 z-index 、 width　など・・・ ）
それらの制限なく、子要素が親要素を「飛び出して」表示する必要があるときにcreatePortalを使うのが有効です。
モーダル、ポップアップ、トーストは使用の代表例です。
*/
// 追加
const ModalPortal = ({ children }) => {
  const target = document.querySelector('.container.start')
  return createPortal(children, target)
}
// ここまで

const Example = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="container start"></div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={modalOpen}
      >
        モーダルを表示する
      </button>
      // 編集
      {modalOpen && (
        <ModalPortal>
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
      ここまで
    </div>
  );
};

export default Example;
```

## 85. [Buggling] Prtalを使う際の注意点!

+ `08_other_function/src/010_prtals/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";
import Modal from "./components/Modal";
import { createPortal } from "react-dom"

/* POINT createPortalの使い方
第一引数: React の子要素としてレンダー可能なもの （要素、文字列、フラグメント、コンポーネントなど）
第二引数: レンダー先のDOM要素
*/

/* POINT createPortalはどんなときに使うか？
子要素は親要素のスタイルによって表示に制限を受ける場合があります。
（overflow: hidden 、 z-index 、 width　など・・・ ）
それらの制限なく、子要素が親要素を「飛び出して」表示する必要があるときにcreatePortalを使うのが有効です。
モーダル、ポップアップ、トーストは使用の代表例です。
*/
const ModalPortal = ({ children }) => {
  const target = document.querySelector('.container.start')
  return createPortal(children, target)
}

const Example = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div onClick={() => console.log('空のdiv')}> // 編集
      <div className="container start"></div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={modalOpen}
      >
        モーダルを表示する
      </button>
      {modalOpen && (
        <ModalPortal>
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
    </div>
  );
};

export default Example;
```

+ コンソールで確認してみる<br>

+ `08_other_function/src/010_prtals/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";
import Modal from "./components/Modal";
import { createPortal } from "react-dom"

/* POINT createPortalの使い方
第一引数: React の子要素としてレンダー可能なもの （要素、文字列、フラグメント、コンポーネントなど）
第二引数: レンダー先のDOM要素
*/

/* POINT createPortalはどんなときに使うか？
子要素は親要素のスタイルによって表示に制限を受ける場合があります。
（overflow: hidden 、 z-index 、 width　など・・・ ）
それらの制限なく、子要素が親要素を「飛び出して」表示する必要があるときにcreatePortalを使うのが有効です。
モーダル、ポップアップ、トーストは使用の代表例です。
*/
const ModalPortal = ({ children }) => {
  const target = document.querySelector('.container.start')
  return createPortal(children, target)
}

const Example = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div onClick={() => console.log('空のdiv')}> // バブリングによって発火する
      <div className="container start" onClick={() => console.log('container')}></div> // 編集 バブリングによって発火しない

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={modalOpen}
      >
        モーダルを表示する
      </button>
      {modalOpen && (
        <ModalPortal>
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
    </div>
  );
};

export default Example;
```

## 86. [練習&解答] createPortalでトーストを作成してみよう


+ `08_other_function/src/020_practice_prtals/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./components/Toast"; // 追加

// 追加
const ToastPortal = ({ children }) => {
  const target = document.querySelector('.container.start')
  return createPortal(children, target)
}
// ここまで

const Example = () => {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <div>
      <h3>
        トーストの作成（createPortal）
      </h3>
      <p>ボタンを押すと.container.start要素にマウントされて、表示されるトーストを作成してください。トーストにはToastコンポーネントを使用してください。</p>

      <div className="container start"></div>

      <button
        type="button"
        onClick={() => setToastOpen(true)}
        disabled={toastOpen}
      >
        トーストを表示する
      </button>
      {toastOpen && (
        <ToastPortal> // 追加
          <Toast
            visible={toastOpen}
            handleCloseClick={() => setToastOpen(false)}
          />
        </ToastPortal> // 追加
      )}
    </div>
  );
};

export default Example;
```

## 86. [useRef] refでDOMを直接操作してみよう

+ `08_other_function/src/030_useRef/start/Example.js`を編集<br>

```js:Example.js
import { useRef, useState } from "react"; // 編集

const Case1 = () => {
  const [value, setValue] = useState("");
  // 追加
  const inputRef = useRef()
  // console.log(inputRef)
  // ここまで

  return (
    <div>
      <h3>ユースケース1</h3>
      <input type="text" ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} /> // 編集 ref={inputRef}を追加
      <button onClick={() => console.log(inputRef)}> // 編集
        インプット要素をフォーカスする
      </button>
    </div>
  );
};

const Example = () => {
  return (
    <>
      <Case1 />
    </>
  );
};

export default Example;
```

+ `08_other_function/src/030_useRef/start/Example.js`を編集<br>

```js:Example.js
import { useRef, useState } from "react";

const Case1 = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef()
  // console.log(inputRef)

  return (
    <div>
      <h3>ユースケース1</h3>
      <input type="text" ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => inputRef.current.focus()}> // 編集 クリックするとinput欄にフォーカスが当たるようになる
        インプット要素をフォーカスする
      </button>
    </div>
  );
};

const Example = () => {
  return (
    <>
      <Case1 />
    </>
  );
};

export default Example;
```

## 88. [useRef] refで動画プレイヤーを作成してみよう

+ `08_other_function/src/030_useRef/start/Example.js`を編集<br>

```js:Example.js
import { useRef, useState } from 'react'

const Case1 = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef()
  // console.log(inputRef)

  return (
    <div>
      <h3>ユースケース1</h3>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => inputRef.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </div>
  )
}

// 追加
const Case2 = () => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef()

  return (
    <div>
      <video style={{ maxWidth: '100%' }} ref={videoRef}>
        <source src="./sample.mp4"></source>
      </video>
      <button
        onClick={() => {
          if (playing) {
            videoRef.current.pause()
          } else {
            videoRef.current.play()
          }
          // setPlaying(!playing)
          setPlaying(prev => !prev)
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}
// ここまで

const Example = () => {
  return (
    <>
      <Case1 />
      <Case2 /> // 追加
    </>
  )
}

export default Example
```

## 89. [useRef] refとは？ refとstateの違い

### useRefとは

```
再レンダリングを発生させず値を保持する方法
```

`const ref = useRef(initialValue)`<br>

+ useRefは "refオブジェクト"を返す<br>

+ cuurentプロパティに値が設定される<br>

+ ref.currentで値にアクセスできる。値は読み書き可能<br>

### refの特徴

+ 再レンダリングされても情報が保存される。<br>
(※通常の変数はレンダリングの度に初期化される)<br>

+ refの値を変更しても再レンダリングがトリガーされない<br>
(※同じく値を保持できるstateは変更されると再レンダリングされる)<br>

+ refオブジェクトをJSXのref属性に渡すとそのDOMにアクセスできるようになる<br>

↓<br>

`最も一般的な利用法`<br>

+ `08_other_function/src/030_useRef/start/Example.js`を編集<br>

```js:Example.js
import { useRef, useState } from 'react'

const Case1 = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef()
  // console.log(inputRef)

  return (
    <div>
      <h3>ユースケース1</h3>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => inputRef.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </div>
  )
}

const Case2 = () => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef()

  return (
    <div>
      <h3>ユースケース2</h3>
      <video style={{ maxWidth: '100%' }} ref={videoRef}>
        <source src="./sample.mp4"></source>
      </video>
      <button
        onClick={() => {
          if (playing) {
            videoRef.current.pause()
          } else {
            videoRef.current.play()
          }
          // setPlaying(!playing)
          setPlaying((prev) => !prev)
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}

// 追加
const createTimeStamp = () => new Date().getTime()

const Case3 = () => {
  const [timeStamp, setValue] = useState(createTimeStamp())
  const ref = useRef(createTimeStamp())

  const updateState = () => {
    setValue(createTimeStamp())
  }

  const updateRef = () => {
    /* コンソールを見るとブラウザの表示と、ref.currentの中身が異なることを確認できます */
    ref.current = createTimeStamp()
    console.log('ref.current -> ', ref.current)
  }
  return (
    <div>
      <h3>ユースケース3</h3>
      <p>
        state: {timeStamp}
        <button onClick={updateState}>更新</button>
      </p>
      <p>
        ref: {ref.current}
        <button onClick={updateRef}>更新</button>
      </p>
    </div>
  )
}
// ここまで

const Example = () => {
  return (
    <>
      <Case1 />
      <Case2 />
      <Case3 /> // 追加
    </>
  )
}

export default Example
```

## 90. [forwardRef] 他のコンポーネントのDOMにアクセスする方法

+ 08_other_function/src/040_forwardRef/start/Example.js`を編集(一つ目の方法)<br>

```js:Example.js
import { useRef } from "react";

const Input = ({ customeRef }) => {
  return <input type="text" ref={customeRef} />
}
const Example = () => {
  const ref = useRef();
  return (
    <>
      <Input customeRef={ref} />
      <button onClick={() => ref.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </>
  );
};

export default Example;
```

+ 08_other_function/src/040_forwardRef/start/Example.js`を編集(二つ目の方法)<br>

```js:Example.js
import { useRef, forwardRef } from 'react' // 編集

const Input = forwardRef((props, ref) => { // 編集
  return <input type="text" ref={ref} /> // 編集
})

const Example = () => {
  const ref = useRef()
  return (
    <>
      <Input ref={ref} />
      <button onClick={() => ref.current.focus()}>
        インプット要素をフォーカスする
      </button>
    </>
  )
}

export default Example
```
