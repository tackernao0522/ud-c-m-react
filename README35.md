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
