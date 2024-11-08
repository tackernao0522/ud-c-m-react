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
