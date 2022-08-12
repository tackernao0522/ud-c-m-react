import React from "react";

const Example = () => {
  const sample1 = <h1 className="greeting">Hello World</h1>;

  console.log(sample1);

  console.log(React.createElement("h1", {
    className: "greeting"
  }, "Hello World")); // (console.log(sample1))と同じ結果になる

  // Babelに`<h1 className="greeting">Hello World</h1>`を打ち込むと。。。
  // React.createElement("h1", {
  //   className: "greeting"
  // }, "Hello World");

  // 結果
  // React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Hello!"),
  // React.createElement("h2", null, "Good to see you."));

  const sample2 = (
    <div>
      <h1>Hello!</h1>
      <h2>Good to see you.</h2>
    </div>
  );

  console.log(sample2);

  // 第2引数nullの部分はpropsが入ってくる 第3引数のタグの中身には文字列が入る
  React.createElement("div", null,
    React.createElement("h1", null, "Hello!"),
    React.createElement("h2", null, "Good to see you.")
  );

  // Babelに下記コードを貼り付けてみる
  //  <div>
  //   <h1>Hello!</h1>
  //   <h2>Good to see you.</h2>
  // </div >

  console.log(
    (
      <div>
        <h1>Hello!</h1>
        <h2>Good to see you.</h2>
      </div>
    ).props
  );

  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello!"),
    React.createElement("h2", null, "Good to see you.")
  );
};

export default Example;
