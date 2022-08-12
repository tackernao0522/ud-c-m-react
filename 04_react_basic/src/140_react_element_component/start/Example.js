import React from "react";

const Bye = () => {
      return <h2>GoodBye!</h2>;
}

const Example = () => {
  return (
    <div>
      <Bye/>
    </div>
  );
};

// コンポーネント自体もReact要素である
// const Bye = () => {
//   return React.createElement("h2", null, "GoodBye!");
// };

// const Example = () => {
//   return React.createElement("div", null, React.createElement(Bye, null));
// };

console.log(Example());

export default Example;

