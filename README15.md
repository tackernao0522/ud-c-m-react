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