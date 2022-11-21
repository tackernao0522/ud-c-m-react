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

## 175. 更新リクエストをサーバーに送信してみよう

+ `$ mkdir 060_other_method/start/api && touch $_/todo.js`を実行<br>

+ `060_/other_method/start/api/todo.js`を編集<br>

```js:todo.js
import axios from 'axios'

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL)
    console.log(result)
    return result.data
  },
}

todoApi.getAll()
```

+ `16_rest_api/src/060_other_method/start/Example.js`を編集<br>

```js:Example.js
import Todo from "./components/Todo";
import "./api/todo" // 追加

const Example = () => {
  return (
    <>
      <h2>Reminder</h2>
      <Todo />
    </>
  );
};

export default Example;
```

```:terminal
{data: Array(3), status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
config
:
{transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
data
:
Array(3)
0
:
{id: 'c5868bfe-fa1d-4891-acd3-bc43959a9bb7', content: '洗濯', editing: false, completed: true}
1
:
{id: '5d87d115-7ebb-4d17-adce-4ffe4b39f8c5', content: '掃除', editing: false, completed: false}
2
:
{id: 'f2c38014-e2df-40ae-ac93-36303b8771ce', content: '買い物', editing: false, completed: false}
length
:
3
[[Prototype]]
:
Array(0)
headers
:
{cache-control: 'no-cache', content-length: '391', content-type: 'application/json; charset=utf-8', expires: '-1', pragma: 'no-cache'}
request
:
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status
:
200
statusText
:
"OK"
[[Prototype]]
:
Object
```

+ `060_/other_method/start/api/todo.js`を編集<br>

```js:todo.js
import axios from 'axios'

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL)
    console.log(result)
    return result.data
  },
  // 追加
  async post(todo) {
    const result = await axios.post(ENDPOINT_URL, todo)
    return result.data
  },
  // ここまで
}

// 編集
todoApi.post({
  id: 3432432, // 適当に記述してみた
  content: 'test',
})
```

+ Reactのホットリロードにより、`db.json`に上記のpost データが保存されている<br>

+ `060_/other_method/start/api/todo.js`を編集<br>

```js:todo.js
import axios from 'axios'

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL)
    console.log(result)
    return result.data
  },
  async post(todo) {
    const result = await axios.post(ENDPOINT_URL, todo)
    return result.data
  },
  async delete(todo) {
    const result = await axios.delete(`${ENDPOINT_URL}/${todo.id}`)
    return result.data
  },
}

todoApi.delete({
  id: 3432432,
})
```

+ Reactのホットリロードにより、`db.json`に上記のdeleteしたidのデータが削除されている<br>

+ `060_/other_method/start/api/todo.js`を編集<br>

```js:todo.js
import axios from 'axios'

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL)
    console.log(result)
    return result.data
  },
  async post(todo) {
    const result = await axios.post(ENDPOINT_URL, todo)
    return result.data
  },
  async delete(todo) {
    const result = await axios.delete(`${ENDPOINT_URL}/${todo.id}`)
    return result.data
  },
  // 追加
  async patch(todo) {
    const result = await axios.put(`${ENDPOINT_URL}/${todo.id}`, todo)
    return result.data
  },
}

// 編集
todoApi.patch({
  id: 'f2c38014-e2df-40ae-ac93-36303b8771ce',
  content: '買い物します',
  editing: false,
  completed: false,
})
```

+ Reactのホットリロードにより、`db.json`に上記の更新したidのデータが更新されている<br>

+ `060_/other_method/start/api/todo.js`を編集<br>

```js:todo.js
import axios from 'axios'

const ENDPOINT_URL = 'http://localhost:3003/todo'

const todoApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL)
    console.log(result)
    return result.data
  },
  async post(todo) {
    const result = await axios.post(ENDPOINT_URL, todo)
    return result.data
  },
  async delete(todo) {
    const result = await axios.delete(`${ENDPOINT_URL}/${todo.id}`)
    return result.data
  },
  async patch(todo) {
    const result = await axios.put(`${ENDPOINT_URL}/${todo.id}`, todo)
    return result.data
  },
}

export default todoApi // 編集
```
