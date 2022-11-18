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

## 173. 取得したデータを画面に反映してみよう

+ `16_rest_api/src/050_axios_get_state/start/Example.js`を編集<br>

```js:Example.js
import axios from 'axios'
import { useEffect, useState } from 'react'

const Example = () => {
  const [users, setUsers] = useState([]) // mapメソッドを使い際に初期値に空の配列を設定する ()だけなら users?.map((user) => ....)とする

  useEffect(() => {
    console.log('useEffect called')
    const getUser = async () => {
      const res = await axios.get('http://localhost:3003/user')
      setUsers(res.data) // setUsersで更新して回しているので無限ループが起きてしまう console.logは一度だけなので問題ない。
    }
    getUser()
  }, []) // useEffectの第二引数に[]を入れないと再レンダリングの無限ループが起きてしまう

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>age: {user.age}</p>
          <p>hobby: {user.hobbies.join(' , ')}</p>
        </div>
      ))}
    </div>
  )
}

export default Example
```

## 174. GUIでリクエストの状態を確認しよう

+ [Adavanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo)<br>

+ [POSTMAN](https://www.postman.com/)<br>

`＊` Adavanced REST clientを使ってみる<br>

+ `Request URL` => `http://localhost:3003/user`と入力 => `Method` => `POST` => `Body`に下記を貼り付ける<br>

```
{
      "id": 1,
      "username": "hoge太郎",
      "age": 20,
      "hobbies": [
        "サッカー",
        "野球"
      ],
      "premiumAccount": true
    }
```

+ `Body content type` => `application/json` => `FORMAT JSON`で整形する => `Body`に貼り付けたJSONデータを下記のように編集する(新しいデータを追加するため)<br>

```
{
  "id": 10,
  "username": "hoge",
  "age": 23,
  "hobbies": [
    "サッカー",
    "野球"
  ],
  "premiumAccount": true
}
```

+ `SEND`をクリック<br>

+ `16_rest_api/db/db.json`に上記のデータが追加されている<br>

```json:db:json
{
  "todo": [
    {
      "id": "c5868bfe-fa1d-4891-acd3-bc43959a9bb7",
      "content": "洗濯",
      "editing": false,
      "completed": true
    },
    {
      "id": "5d87d115-7ebb-4d17-adce-4ffe4b39f8c5",
      "content": "掃除",
      "editing": false,
      "completed": false
    },
    {
      "id": "f2c38014-e2df-40ae-ac93-36303b8771ce",
      "content": "買い物",
      "editing": false,
      "completed": false
    }
  ],
  "user": [
    {
      "id": 1,
      "username": "hoge太郎",
      "age": 20,
      "hobbies": [
        "サッカー",
        "野球"
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
      "username": "piyo三郎",
      "age": 50,
      "hobbies": [
        "筋トレ",
        "水泳"
      ],
      "premiumAccount": true
    },
    {
      "id": 10,
      "username": "hoge",
      "age": 23,
      "hobbies": [
        "サッカー",
        "野球"
      ],
      "premiumAccount": true
    }
  ]
}
```

+ `201 Created` の200番台は正常に処理されたことを表している<br>

+ `Method` => `PUT` => `Request URL` => `http://localhost:3000/user/3` => `Body`に下記を貼り付ける<br>

```
{
  "id": 3,
  "username": "piyo三郎",
  "age": 50,
  "hobbies": [
    "筋トレ",
    "水泳"
  ],
  "premiumAccount": true
}
```

+ 上記のJSONデータを編集<br>

```
{
  "id": 3,
  "username": "piyo次郎",
  "age": 50,
  "hobbies": [
    "筋トレ",
    "水泳"
  ],
  "premiumAccount": true
}
```

+ `SEND`をクリック<br>

+ `16_rest_api/db/db.json`に上記のデータが変更されている<br>

```json:db.json
{
  "todo": [
    {
      "id": "c5868bfe-fa1d-4891-acd3-bc43959a9bb7",
      "content": "洗濯",
      "editing": false,
      "completed": true
    },
    {
      "id": "5d87d115-7ebb-4d17-adce-4ffe4b39f8c5",
      "content": "掃除",
      "editing": false,
      "completed": false
    },
    {
      "id": "f2c38014-e2df-40ae-ac93-36303b8771ce",
      "content": "買い物",
      "editing": false,
      "completed": false
    }
  ],
  "user": [
    {
      "id": 1,
      "username": "hoge太郎",
      "age": 20,
      "hobbies": [
        "サッカー",
        "野球"
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
      "username": "piyo次郎",
      "age": 50,
      "hobbies": [
        "筋トレ",
        "水泳"
      ],
      "premiumAccount": true
    },
    {
      "id": 10,
      "username": "hoge",
      "age": 23,
      "hobbies": [
        "サッカー",
        "野球"
      ],
      "premiumAccount": true
    }
  ]
}
```

+ `PATCH`メソッドも更新用のメソッドである。上記と同じように編集すれば良い<br>

+ `Method` => `DELETE` => `Request URL` => `http://localhost:3003/user/10` => `SEND`<br>

+ `idの10`のデータが削除される<br>
