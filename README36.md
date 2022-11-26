## 187. Linkを使って画面遷移を行おう

+ `17_next_p1/start/src/pages/index.js`を編集<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/07_router">
        <a>/07_router</a>
      </Link>
      <a href="/07_router">/07_router</a> // 画面遷移されてしまう
    </>
  )
}
```

+ localhost:3000にアクセスして リンク箇所をクリックすると `Blog Page`に遷移する<br>

+ `17_next_p1/start/src/pages/index.js`を編集<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/07_router" as="/dummy-url">
        <a>/07_router</a>
      </Link>
      <a href="/07_router">/07_router</a>
    </>
  )
}
```

+ localhost:3000にアクセスして リンク箇所をクリックすると `Blog Page`に遷移先のURLは http://localhost:3000/dummy-url になる<br>

+ `17_next_p1/start/src/pages/index.js`を編集(オブジェクト形式での書き方)<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={{ pathname: '/07_router', query: { key: 'value' } }}> // 遷移先のURLは http://localhost:3000/07_router?key=value になる
        <a>/07_router</a>
      </Link>
      <a href="/07_router">/07_router</a>
    </>
  )
}
```

+ `17_next_p1/start/src/pages/index.js`を編集(オブジェクト形式での書き方)<br>

```js:index.js
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={{ pathname: '/07_router', query: { key: 'value' } }}>
        <a>/07_router</a>
      </Link>
      // 編集
      <Link href="/07_router/hello/setting">
        <a>/07_router</a>
      </Link>
      // ここまで
    </>
  )
}
```

## 188. シングルコンポーネントで複数画面を作成する方法

+ `17_nextjs_p1/start/src/pages/08_multipage/index.js`を編集<br>

```js:index.js
import { useRouter } from 'next/router'

export default function MultiPage() {
  const router = useRouter()
  const step = router.query.step ?? 0

  const goToStep = (_step, asPath) => {
    router.push(`/08_multipage?step=${_step}`, asPath)
  }

  return (
    <div>
      {step == 0 && (
        <>
          <h3>Step {step}</h3>
          <button onClick={() => goToStep(1, '/personal')}>Next Step</button>
        </>
      )}
      {step == 1 && (
        <>
          <h3>Step {step}</h3>
          <button onClick={() => goToStep(2, '/confirm')}>Next Step</button>
        </>
      )}
      {step == 2 && (
        <>
          <h3>Step {step}</h3>
          <button onClick={() => goToStep(0, '/08_multipage')}>
            Next Step
          </button>
        </>
      )}
    </div>
  )
}
```

+ http://localhost:3000/08_multipage にアクセスしてみる<br>

+ `17_nextjs_p1/start/next.config.js`を編集<br>

```js:next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/personal',
        destination: '/08_multipage?step=1',
      },
      {
        source: '/confirm',
        destination: '/08_multipage?step=2',
      },
    ]
  },
}

module.exports = nextConfig
```

+ サーバーを一度再起動する<br>

+ localhost:3000/personal へアクセスしてみる<br>
