# セクション16: Rest APIを使ったサーバーとの通信

## 169. REST APIとは？

__REST API__<br>

以下の特徴を持つ、サーバーへのリクエスト方式のこと<br>

+ リソース毎にURLを定義<br>
+ メソッドでリソースに対する処置を定義(メソッドの例: POST、GET、DELETE、PUTなど)<br>
+ JSONでデータをやり取りする<br>

## 170. JSONとは?

+ `16_rest_api/src/020_what_is_json/start/sample.jsonc`を編集<br>

```jsonc:sample.jsonc
// POINT JSONとは
// JavaScript Object Notation の略称
// JavaScript のデータ定義文をベースとした、簡易的なデータ定義言語
// 様々な言語間のデータ通信の際に用いられることが多い
// これまでは XML が利用されてきましたが、現在では簡易的な JSON が利用されることが増えています
// JSON ファイルは拡張子 .json で記述する
// 通常の json ファイルの場合はコメントを書くことができないが、 .jsonc にするとコメントを書くことができる。
[
  // オブジェクトのkeyはダブルコーテーションを使用する
  {
    "id": 1,
    "username": "hoge太郎",
    "age": 20,
    "hobbies": [
      "soccer"
    ],
    "premiumAccount": true
  },
  {
    "id": 2,
    "username": "fuga太郎",
    "age": 17,
    "hobbies": [
      "カメラ"
    ],
    "premiumAccount": false
  },
  {
    "id": 3,
    "username": "piyo太郎",
    "age": 20,
    "hobbies": [
      "筋トレ"
    ],
    "premiumAccount": true
  }
]
```

+ `16_rest_api/src/020_what_is_json/start/Example.js`を編集<br>

```js:Example.js
const Example = () => {
  const usersData = [
    {
      id: 1,
      username: "hoge太郎",
      age: 20,
      hobbies: ["soccer"],
      premiumAccount: true
    },
    {
      id: 2,
      username: "fuga太郎",
      age: 17,
      hobbies: ["カメラ"],
      premiumAccount: false
    },
    {
      id: 3,
      username: "piyo太郎",
      age: 20,
      hobbies: ["筋トレ"],
      premiumAccount: true
    }
  ];

  // JSON.stringify = オブジェクトや配列をJSON形式の文字列に変換する
  const usersDataString = JSON.stringify(usersData);

  // JSON形式の文字列が出力される
  console.log(typeof usersDataString === 'string');

  // JSON形式の文字列をJavaScriptが認識できる形に変換する
  console.log(JSON.parse(usersDataString));

};

export default Example;
```

## 171. JSON ServerでモックアップAPIを作成

+ 16_rest_api/src/030_json_server/start/Example.js`を編集<br>

```js:Example.js
// POINT JSON server とは
// API のモックを手軽に作成できる node.js のライブラリです。
// APIモックとは モックアップのことで、開発環境用の簡易APIのことです。

// JSON server をインストールする
// npm i -D json-server

// json ファイルを用意する

// オブジェクト形式で、パス名をkeyにする
// {
//   "パス名": json形式のデータ
// }

// npx json-server -w src/**/db.json

// localhost:3003/user または localhost:3003/todo でjsonにアクセスできる

const Example = () => {
  return (
    <p style={{ textAlign: "center" }}>
      startフォルダの内容が表示されます。
      <br />
      練習用に使ってください！
    </p>
  );
};

export default Example;
```

## 171. Axiosを使ってサーバーからデータを取得しよう

+ 16_rest_api/src/040_axios_get_request/start/Example.js`を編集<br>

```js:Example.js
import axios from 'axios'
import { useEffect } from 'react'

const Example = () => {
  useEffect(() => {
    axios.get('http://localhost:3003/user').then((res) => {
      console.log(res.data)
    })
  })
}

export default Example
```

又は<br>

+ 16_rest_api/src/040_axios_get_request/start/Example.js`を編集(JavaScriptでのAsyncを定義すると警告が出る)<br>

```js:Example.js
import axios from 'axios'
import { useEffect } from 'react'

const Example = () => {
  useEffect(async () => {
    const res = await axios.get('http://localhost:3003/user')
    console.log(res.data)
  })
}

export default Example
```

修正<br>

+ 16_rest_api/src/040_axios_get_request/start/Example.js`を編集(修正)<br>

```js:Example.js
import axios from 'axios'
import { useEffect } from 'react'

const Example = () => {
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:3003/user')
      console.log(res.data)
    }
    getUser()
  })
}

export default Example
```
