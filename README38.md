# セクション18: Next.js(Part.2) レンダリング

__複数のレンダリング方法の選択__<br>

## CSR - クライアント再度レンダリング (Client Side Rendering)<br>

データフェッチやルーティングの全てがクライアント上で行われる => これまで行ってきたReact開発はCSRに分類される<br>

※ Next.jsの開発ではクライアント側でのみ行いたい処理はuseEffectで囲む<br>

__メリット__<br>

+ 静的なファイルの配置のみで動く<br>
+ Node.jsの実行は必要ないため、サーバーの負荷が軽い<br>

__デメリット__<br>

+ 初期描画までに時間がかかる<br>
+ クローラーによってはSEO的な問題あり<br>

## SSR (Server Side Rendering) - サーバーサイドレンダリング<br>

Node.js（サーバー）にリクエストが来たタイミングで動的にHTMLを生成<br>

外部APIへのデータの取得やコンポーネントのpropsの値を決定する処理を行い、HTMLを生成してクライアント側に返却する<br>

__メリット__<br>

+ 生成済みのHTMLを取得するのでSEOに強い<br>

__デメリット__<br>

+ 生成処理を全てサーバー側でするので負担大<br>
+ HTMLをクライアントに渡すまで時間がかかる<br>

## SG - 静的サイト生成 (Static Generation)<br>

ビルド時にデータフェッチやpropsの値の決定をこない、HTMLを構築する<br>

クライアントからのリクエストされたら、サーバー側で構築することなく、生成済みHTMLを渡す<br>

__メリット__<br>

+ 構築済みページのため表示速度が早い<br>
+ SEOも問題なし<br>

__デメリット__<br>

+ 更新頻度が高い動的コンテンツとの相性が悪い<br>

基本的なページは<br>

__SG - 静的サイト生成__<br>

動的に作成する必要があるページは<br>

__SSR - サーバーサイドレンダリング__<br>

を用いる<br>

## ISR - インクリメンタル静的再生成 (Incremental Static Regeneration)<br>

+ ビルド時にHTMLを構築<br>

+ 一定時間後にアクセスがあった場合、生成済みのHTMLを返しつつ、サーバー側でHTMLを更新<br>

+ 次のアクセス時に最新のHTMLを渡す<br>

__メリット__<br>

+ SGを利用しながら動的なコンテンツも更新できる<br>

__デメリット__<br>

+ サーバーの設定が少し手間<br>
+ 基本はNext.jsの開発元のVercelを使う<br>

## 194. 書きながら学びたい人はコトラを受講ください

+ `$ mkdir 18_nextjs_p2/start/src && mkdir $_/pages && touch $_/_app.js`を実行<br>

+ `18_nextjs_p2/start/pages/_app.js`を編集<br>

```js:_app.js
import '../styles/globals.css'
import Layout from '../components/layout'

function Myapp({ component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Myapp
```

+ `$ touch 18_nextjs_p2/start/src/pages/index.js`を実行<br>

+ `18_nextjs_p2/start/src/pages/index.js`を編集<br>

```js:index.js
import Link from 'next/link'
import { navList } from '../data/nav'

export default function Home() {
  return (
    <ul>
      {navList.map((item) => (
        <li key={item}>
          <Link href={`/${item}`}>
            <a>{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
```

+ `$ mkdir 18_nextjs_p2/start/src/styles && touch $_/globals.css`を実行<br>

+ `18_nextjs_p2/start/src/styles && touch $_/globals.css`を編集<br>

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

.text {
  line-height: 1.5;
  padding-left: 20px;
  font-size: 18px;
}

.date {
  font-size: 14px;
  text-align: right;
  color: #333;
}

.list {
  padding: 0;
  list-style: none;
  width: 80%;
  margin: 0 auto;
}

.listItem:not(first-child) {
  margin-top: 10px;
}

.container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.container:hover {
  opacity: 0.7;
  transform: scale(1.05, 1.05);
}

.container {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.container:hover {
  opacity: 0.7;
  transform: scale(1.05, 1.05);
}

.title {
  font-size: 24px;
  position: relative;
}

.titleSub {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  color: #ccc;
  font-weight: 400;
  padding-bottom: 8px;
  transform: translateY(-100%);
}

.layout {
  margin: 0 auto;
  max-width: 960px;
  padding: 160px 20px 80px;
  min-height: 100vh;
  background-color: #eee;
  color: #000;
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
  z-index: 1000;
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
```

+ `$ 18_nextjs/start/src/components/layout/index.js`を実行<br>

+ `18_nextjs/start/src/components/layout/index.js`を編集<br>

```js:index.js
import Header from '../header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="layout">{children}</main>
    </>
  )
}
```

+ `$ mkdir 18_nextjs_p2/start/src/components/header && touch $_/index.js`を実行<br>

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
            loader={({ src }) => src}
            src="/vercel.svg"
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

+ `$ mkdir18_nextjs_2/start/src/data && touch $_/nav.js`を実行<br>

+ `18_nextjs_p2/start/src/data/nav.js`を編集<br>

```js:nav.js
export const navList = ['010_SSR']
```

## 195. [注意] 本セクションのendフォルがのコードを動かす際の注意点

本セクションのendフォルダ内のコードではJSON Serverからデータを取得している箇所があります。<br>

そのため、JSON Serverを裏側で動かしていないと npm run build などを実行した際にエラーが発生します。<br>

+ エラーメッセージと事象<br>

npm run devやnpm run buildを実行すると、030_SG_fetchでエラーが発生します。<br>

理由としてはJSON Serverが立ち上がっていないため、Next.jsからJSON Serverへのリクエストが正常に行えないため。（JSON ServerからJSONの情報が返ってこない。）<br>

<img src="https://i.gyazo.com/ac2b326bf434c1b1f34b0142b6b8861c.png" /> <br>

JSON Serverを実行しながらNext.jsを実行するためには、「Split Terminal」、または「New Terminal」で２つターミナルを立ち上げて、片方でJSON Serverを実行し、もう片方でNext.jsを実行するようにします。<br>

+ ターミナルを二つ立ち上げる<br>

「Split Terminal」で二つターミナルを立ち上げて、JSON ServerとNext.jsを同時に実行する。<br>

<img src="https://i.gyazo.com/6a3e57558f1554b2795e9930820b684b.png" /> <br>

以上、ご留意ください。<br>
