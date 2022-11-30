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
