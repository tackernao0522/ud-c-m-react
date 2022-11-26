# セクション17: Next.js (Part1) 基本的な使い方

## 180. Next.jsとは？ なぜNext.jsを使うのか？

React開発のためのフレームワーク<br>

高速なWebアプリケーションを作成するためのさまざまな機能を提供<br>

+ [Next.js](https://nextjs.org/) <br>

__Reactとの違い__<br>

+ __React__<br>

UIを構築するための機能を提供するライブラリ<br>

+ __Next.js__<br>

React開発のための機能を提供するフレームワーク<br>

__Next.jsのメリット__<br>

ゼロコンフィグで高度な機能を使用可能。<br>

手動で複雑な設定をする必要なく、効率的に開発を進めることができる。<br>


__Next.jsの主な機能__<br>

+ 複数のレンダリング方法（SSR、SG、ISG）<br>

+ ファイルベースルーティング（ダイナミックルート）<br>

+ APIの作成（API Routes）<br>

+ デベロッパーに優しい開発環境（ゼロコンフィグ）<br>

## 181. Next.jsをインストールしてみよう

+ [next.config.jsの設定方法](https://nextjs.org/docs/api-reference/next.config.js/introduction)<br>

+ `$ cd 17_nextjs_p1/start`を実行<br>

+ `$ npm install`を実行<br>

+ `$ npm run dev`を実行<br>

+ localhost:3000 にアクセス<br>

+ `$ mkdir 17_nextjs_p1/start/src && mv 17_nextjs_p1/start/{pages,styles} 17_nextjs_p1/start/src`を実行<br>

+ `start/src/pages/index.js`を編集<br>

```js:index.js
export default function Home() {
}
```

## 182. 書きながら学びたい人はこちらを受講ください

+ `17_nextjs_p1/start/src/styles/globals.css`を編集<br>

```css:globals.css
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.layout1 {
  margin: 0 auto;
  max-width: 960px;
  margin-top: 80px;
  padding: 80px 20px;
  height: 150vh;
  background-color: #eee;
}

.layout2 {
  margin: 0 auto;
  max-width: 960px;
  margin-bottom: 80px;
  padding: 80px 20px;
  height: 150vh;
  background-color: #eee;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 4px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
  background-color: #fff;
}

.headerBottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 4px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
  background-color: #fff;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  list-style: none;
  flex-wrap: wrap;
}

.link {
  padding: 4px 12px;
  color: #000;
  font-size: 14;
}

.link:hover {
  opacity: 0.7;
}

.table {
  margin-top: 20px;
  width: 300px;
  border: 1px solid #000;
}

.title {
  padding: 4px 12px;
  background-color: #ccc;
  border: 1px solid #000;
}

.item {
  padding: 4px 12px;
  border: 1px solid #000;
}
```

+ `$ mkdir 17_nextjs_p1/start/src/components && cp -r 17_nextjs_p1/end/src/components/ 17_nextjs_p1/start/src/components`を実行<br>

## 183. ルーティングとは？ 基本的な書き方について学ぼう

+ [router.push](https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router#routerpush) <br>

+ `17_nextjs_p1/start/src/pages/index.js`を編集<br>

```js:index.js
export default function Home() {
  return <h1>Home</h1>
}

// localhost:3000のルートでアクセスできるページ
```

+ `$ mkdir 17_nextjs_p1/start/src/pages/07_router && touch $_/index.js`を実行<br>

+ `17_nextjs_p1/start/src/pages/07_router/index.js`を編集<br>

```js:index.js
export default function Blog() {
  return <h1>Blog Page</h1>
}
```

+ localhost:3000/07_router にアクセスしてみる<br>

+ `$ mkdir 17_nextjs_p1/start/src/pages/07_router/blog && touch  $_/first.js`を実行<br>

+ `17/nextjs_p1/start/src/pages/07_router/blog/first.js`を編集<br>

```js:first.js
export default function First() {
  return <h1>First</h1>
}
```

+ localhost:3000/07_router/blog/first にアクセスしてみる<br>

## 184. 動的なルーティングの書き方について学ぼう

+ `17_next_p1/start/src/pages/07_router/blog/[number].js`ファイルを作成<br>

+ `7_next_p1/start/src/pages/07_router/blog/[number].js`を編集<br>

```js:[number].js
export default function Home() {
  return <h1>Home</h1>
}
```

+ http://localhost:3000/07_router/blog/1 にアクセスしてみる<br>

+ http://localhost:3000/07_router/blog/2 にアクセスしてみる<br>

+ http://localhost:3000/07_router/blog/3 にアクセスしてみる<br>

+ http://localhost:3000/07_router/blog/4 にアクセスしてみる<br>

+ `17_next_p1/start/src/pages/07_router/[name]`ディレクトリを作成<br>

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`ファイルを作成<br>

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`を編集<br>

```js:setting.js
export default function Setting() {
  return <h1>[name]/setting.js</h1>
}
```

+ http://localhost:3000/07_router/a/setting にアクセスしてみる<br>

+ http://localhost:3000/07_router/blog/setting にアクセスしてみる (number.jsが取得される)<br>

## 185. 指定されたパスの値をJSで取得

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`を編集<br>

```js:setting.js
export default function Setting({ hello }) {
  return <h1>{hello}</h1>
}

export async function getServerSideProps() {
  return {
    props: { hello: 'こんにちは' },
  }
}
```

+ http://localhost:3000/07_router/a/setting にアクセスしてみる<br>

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`を編集<br>

```js:setting.js
export default function Setting({ hello }) {
  return <h1>{hello}</h1>
}

export async function getServerSideProps(context) {
  console.log(context.query)
  return {
    props: { hello: 'こんにちは' },
  }
}
```

+ http://localhost:3000/07_router/a/setting にアクセスしてみる<br>

```:terminal
{ name: 'a' }
```

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`を編集<br>

```js:setting.js
export default function Setting({ query }) {
  return <h1>{query.name}</h1>
}

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  }
}
```

+ http://localhost:3000/07_router/a/setting にアクセスしてみる<br>

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`を編集<br>

```js:setting.js
import { useRouter } from 'next/router'

export default function Setting({ query }) {
  const router = useRouter()
  return <h1>routerから取得: {router.query.name}</h1>
}

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  }
}
```

+ http://localhost:3000/07_router/hello/setting へアクセスしてみる<br>

+ `17_next_p1/start/src/pages/07_router/[name]/setting.js`を編集<br>

```js:setting.js
import { useRouter } from 'next/router'

export default function Setting({ query }) {
  const router = useRouter()
  console.log(router)
  return <h1>routerから取得: {router.query.name}</h1>
}

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  }
}
```

```:terminal
ServerRouter {
  route: '/07_router/[name]/setting',
  pathname: '/07_router/[name]/setting',
  query: { name: 'hello' },
  asPath: '/07_router/hello/setting',
  isFallback: false,
  basePath: '',
  locale: undefined,
  locales: undefined,
  defaultLocale: undefined,
  isReady: true,
  domainLocales: undefined,
  isPreview: false,
  isLocaleDomain: false
}
```
