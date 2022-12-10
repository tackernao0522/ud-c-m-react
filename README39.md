## 199. [SG] ソースコードからHTMLを作成してみよう

+ `$ mkdir 18_nextjs_p2/start/src/pages/020_SG && touch $_/index.js`を実行<br>

+ `18_nextjs_p2/start/src/pages/020_SG/index.js`を編集<br>

```js:index.js
// Static Site Generation
export default function IndexPage() {
  return <h3>5G</h3>
}
```

+ `18_nextjs_p2/start/src/data/nav.js`を編集<br>

```js:nav.js
export const navList = ['010_SSR', '020_SG']
```

+ `18_nextjs_p2/start/package.json`を編集<br>

```json:package.json
{
  "name": "start",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 4010",
    "build": "next build",
    "start": "next start -p 4020",
    "build-start": "run-s build start",
    "lint": "next lint",
    "next:export": "next export", // 追加
    "export": "run-s build next:export",
    "json-server": "npx json-server -w ./mock/db.json -p 4030"
  },
  "dependencies": {
    "axios": "^0.27.2",
    "json-server": "^0.17.0",
    "next": "12.1.6",
    "react": "18.1.0",
    "react-dom": "18.1.0",
    "swr": "^1.3.0",
    "typescript": ">=3.3.1"
  },
  "devDependencies": {
    "eslint": "8.15.0",
    "eslint-config-next": "12.1.6",
    "npm-run-all": "^4.1.5"
  }
}
```

+ `$ npm run build`を実行<br>

+ `$ npm run export`を実行(エラーになる)<br>

+ `18_nextjs_p2/start/next.config.js`を編集<br>

```js:next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  // 追加
  images: {
    loader: 'custom',
  },
  // ここまで
}

module.exports = nextConfig
```

+ `18_nextjs_p2/start/src/components/header/index.js`を編集<br>

```js:index.js
import Image from 'next/image'
import Link from 'next/link'
import { navList } from '../../data/nav'

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <a>
          <Image
            loader={({ src }) => src} // 追加
            unoptimized={true}
            src="/vercel.svg"
            alt="vercel"
            width={177}
            height={40}
          />
        </a>
      </Link>
      <nav>
        <ul className="nav">
          {navList.map((item) => (
            <li key={item}>
              <Link href={`/${item}`}>
                <a className="link">{item}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

+ `18_next_p2/start/src/pages/010_SSR/index.js`を修正しておく<br>

```js:index.js
import { useEffect, useState } from 'react'

// export default function SSR({ message }) {
export default function SSR({ }) {
  console.log('hello')
  // console.log(message)

  useEffect(() => {
    console.log('useEffect')
    window.localStorage.setItem('key', 'value')
    document.cookie = 'val=0; path=/;'
  }, [])

  const [state, setState] = useState('bye')
  const val = 0
  return <h3>{state}</h3>
}

// export async function getServerSideProps(context) {
//   const { cookie } = context.req.headers
//   console.log('cookie', cookie)
//   console.log('getServerSideProps is executed')

//   return {
//     // redirect: {
//     //   destination: '/',
//     //   permanent: false,
//     // },
//     props: { message: 'From Server Side Props' },
//   }
// }
```

+ `$ npm run build`を実行<br>

+ `$ npm run export`を実行(成功する)<br>

## 200. [SG] エクスポートする際の注意点

+ `18_nextjs_p2/start/next.config.js`を編集<br>

```js:next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true, // 追加
  images: {
    loader: 'custom',
  },
}

module.exports = nextConfig
```

+ `$ npm run export`を実行<br>

## 201. [SG] getStaticProps関数について学ぼう

+ `18_nextjs_p2/start/src/pages/020_SG/index.js`を編集<br>

```js:index.js
// Static Site Generation
export default function IndexPage({ message }) {
  return <h3>5G:{message}</h3>
}

export async function getStaticProps() {
  return {
    props: { message: 'From Static Props' },
  }
}
```

+ `$ npm run export`を実行<br>

+ `18_nextjs_p2/start/src/pages/020_SG/index.js`を編集<br>

```js:index.js
// Static Site Generation
export default function IndexPage({ message }) {
  return <h3>5G:{message}</h3>
}

// buildのタイミングで実行される関数である
export async function getStaticProps() {
  console.log('getStaticProps') // 追加

  return {
    props: { message: 'From Static Props' },
  }
}
```

+ `$ npm run export`を実行<br>

## 202. [SG] getStaticPaths関数について学ぼう

+ `18_nextjs_p2/start/src/pages/020_SG`ディレクトリに`[id].js`ファイルを作成<br>

+ `18_nextjs_p2/start/src/pages/020_SG/[id].js`を編集<br>

```js:[id].js
export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

export async function getStaticProps() {
  return {
    props: {
      id: '1',
    },
  }
}
```

+ `$ npm run export`を実行(Errorになる)<br>

+ `18_nextjs_p2/start/src/pages/020_SG/[id].js`を編集<br>

```js:[id].js
export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

// 追加
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 1 } }],
    fallback: false,
  }
}
// ここまで

export async function getStaticProps() {
  return {
    props: {
      id: '1',
    },
  }
}
```

+ `$ npm run export`を実行(Errorになる)<br>

+ `18_nextjs_p2/start/src/pages/020_SG/[id].js`を編集<br>

```js:[id].js
export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }], // 1 と文字列に修正
    fallback: false,
  }
}

export async function getStaticProps() {
  return {
    props: {
      id: '1',
    },
  }
}
```

+ `$ npm run export`を実行(成功する)<br>

+ http://127.0.0.1:5500/020_SG/1/ にアクセスしてみる<br>

+ `18_nextjs_p2/start/src/pages/020_SG/[id].js`を編集<br>

```js:[id].js
export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }], // 編集
    fallback: false,
  }
}

export async function getStaticProps() {
  return {
    props: {
      id: '1',
    },
  }
}
```

+ `$ npm run export`を実行<br>

+ http://127.0.0.1:5500/020_SG/2/ にアクセスしてみる<br>

+ `18_nextjs_p2/start/src/pages/020_SG/[id].js`を編集<br>

```js:[id].js
export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  }
}

export async function getStaticProps(context) { // 編集
  console.log(context) // 追加
  return {
    props: {
      id: '1',
    },
  }
}
```

+ `$ npm run export`を実行<br>

```:terminal
$ npm run export

{
  params: { id: '1' },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}
{
  params: { id: '2' },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}
```

+ `18_nextjs_p2/start/src/pages/020_SG/[id].js`を編集<br>

```js:[id].js
export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  }
}
```

+ `$ npm run export`を実行<br>

+ http://127.0.0.1:5500/020_SG/1/ 及び http://127.0.0.1:5500/020_SG/2/ にアクセスしてみる<br>
