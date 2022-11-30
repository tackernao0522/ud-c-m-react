## 191. head内にタグを挿入する方法について学ぼう

+ `$ mkdir 17_nextjs_p1/start/src/pages/11_head_script && touch $_/index.js`を実行<br>

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'

export default function Page() {
  return <></>
}
```

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta property="og:title" content="ページのタイトル" />
      </Head>
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta property="og:title" content="ページのタイトル" />
      </Head>
      <Script src='/jquery-3.2.1.min.js' /> // 追加
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

export default function Page() {
  const [load, setLoad] = useState(false)

  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta property="og:title" content="ページのタイトル" />
      </Head>
      // 編集
      <Script
        src="/jquery-3.2.1.min.js"
        onLoad={() => setLoad(true)}
        onError={(e) => {
          console.error(e)
        }}
      />
      <h3>jQuery loaded: {load}</h3>
      // ここまで
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

export default function Page() {
  const [load, setLoad] = useState(false)

  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta property="og:title" content="ページのタイトル" />
      </Head>
      <Script
        src="/jquery-3.2.1.min.js"
        strategy="beforeInteractive" // 編集
        onLoad={() => setLoad(true)}
        onError={(e) => {
          console.error(e)
        }}
      />
      <h3>jQuery loaded: {load ? "true" : "false"}</h3>
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

export default function Page() {
  const [load, setLoad] = useState(false)

  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta property="og:title" content="ページのタイトル" />
      </Head>
      <Script
        src="/jquery-3.2.1.min.js"
        strategy="lazyOnLoad" // 編集
        onLoad={() => setLoad(true)}
        onError={(e) => {
          console.error(e)
        }}
      />
      <h3>jQuery loaded: {load ? "true" : "false"}</h3>
    </>
  )
}
```

+ `17_nextjs_p1/start/src/pages/11_head_script/index.js`を編集<br>

```js:index.js
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

export default function Page() {
  const [load, setLoad] = useState(false)

  return (
    <>
      <Head>
        <title>ページのタイトル</title>
        <meta property="og:title" content="ページのタイトル" />
      </Head>
      <Script
        src="/jquery-3.2.1.min.js"
        strategy="lazyOnLoad"
        onLoad={() => setLoad(true)}
        onError={(e) => {
          console.error(e)
        }}
      />
      <h3>jQuery loaded: {load ? 'true' : 'false'}</h3>

      // 追加
      <Script
        dangerouslySetInnerHTML={{
          __html: `console.log('Inline Script')`,
        }}
      />
      // ここまで
    </>
  )
}
```

## 192. セクションまとめ

### プロジェクトの構成

__プロジェクト構成__ <br>

+ /pages <br>
  ファイルまでのパスがそのままページになる<br>

+ /styles <br>
  グローバルに適用されるスタイルを配置<br>

+ /pages/_app.js <br>
  ページ遷移時に必ず呼ばれる処理を記述<br>

+ next.config.js <br>
  Next.jsの設定を記載<br>

### ルーティング

__ファイルベースルーティング__ <br>

+ pages配下からexportされたコンポーネントを1ページとしてルーティングする<br>

+ [id]は動的なパスとして認識される<br>

+ getServerSideProps<br>
  queryでダイナミックルートを取得する<br>

__ページ遷移__ <br>

+ __useRouter__ <br>
  ページ遷移を行うための値やメソッドを取得する際に利用<br>

+ __<Link href>__ <br>
  hrefに遷移先のURLを設定する<br>

__その他__ <br>

+ __`<Head>`__ <br>
  <Head>タグ内に挿入したいタグを記載する<br>

+ __<Script>__ <br>
  外部スクリプトを読み込む際に利用