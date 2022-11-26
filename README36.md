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
