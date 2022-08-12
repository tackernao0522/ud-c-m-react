## 34. [練習&解答] propsで値を渡してみよう

+ `04_react_basic/src/100_practice_props/start/components/Profile.js`を編集`<br>

```js:Profile.js
import "./Profile.css";

const Profile = ({ name = 'John Doe', age = '??', country = 'Japan' }) => {
  return (
    <div className="profile">
      <h3>{`Name: ${name}`}</h3>
      <h3>{`Age: ${age}`}</h3>
      <h3>{`From: ${country}`}</h3>
    </div>
  );
};


export default Profile;
```

+ `04_react_basic/src/100_practice_props/start/Example.js`を編集<br>

```js:Example.js
import Profile from "./components/Profile";

const profile = [
  { name: "Takashi", age: 19, country: "Japan" },
  { name: "Jane", age: 28, country: "UK" },
];

const Example = () => {
  return (
    <div>
      <h3>練習問題</h3>
      <p>Profileコンポーネントの中身を変更して完成コードと同じ状態になるようにしてください。※なるべく分割代入を使用してください。
      </p>
      <Profile
        name={profile[0].name}
        age={profile[0].age}
        country={profile[0].country}
      />
      <Profile {...profile[1]} />
      <Profile />
    </div>
  );
};

export default Example;
```

## 35. 特別なプロパティ 〜 props.children

+ `04_react_basic/src/110_props_children/start/Example.js`を編集<br>

```js:Example.js
import Profile from "./components/Profile";
import Container from "./components/Container";

const profile = [
  { name: "Takashi", age: 19, country: "Japan", color: "green" },
  { name: "Jane", age: 28, country: "UK", color: "blue" },
];

const Example = () => {
  return (
    <div>
      <Container title="Childrenとは？">
        {1}
      </Container>
    </div>
  );
};

export default Example;
```

+ `04_react_basic/src/110_props_children/start/components/Container.js`を編集<br>

```js:container.js
import "./Container.css";

const Container = ({ title, children }) => {
  return (
    <div className="container">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Container;
```

+ `04_react_basic/src/110_props_children/start/Example.js`を編集<br>

```js:Example.js
import Profile from "./components/Profile";
import Container from "./components/Container";

const profile = [
  { name: "Takashi", age: 19, country: "Japan", color: "green" },
  { name: "Jane", age: 28, country: "UK", color: "blue" },
];

const Example = () => {
  return (
    <div>
      <Container title="Childrenとは？">
        <Profile {...profile[0]} />
      </Container>
    </div>
  );
};

export default Example;
```

+ `04_react_basic/src/110_props_children/start/Example.js`を編集<br>

```js:Example.js
import Profile from "./components/Profile";
import Container from "./components/Container";

const profile = [
  { name: "Takashi", age: 19, country: "Japan" },
  { name: "Jane", age: 28, country: "UK", color: "red" },
];

const Example = () => {
  return (
    <div>
      <Container title="Childrenとは？">
        <Profile {...profile[0]} />
        <Profile {...profile[1]} />
      </Container>
    </div>
  );
};

export default Example;
```

+ `04_react_basic/src/110_props_children/start/Example.js`を編集(この書き方だとkeyが必要になる)<br>

```js:Example.js
import Profile from "./components/Profile";
import Container from "./components/Container";

const profile = [
  { name: "Takashi", age: 19, country: "Japan" },
  { name: "Jane", age: 28, country: "UK", color: "red" },
];

const Example = () => {
  return (
    <div>
      <Container title="Childrenとは？" children={
        [
          <Profile key={profile[0].name} {...profile[0]} />,
          <Profile key={profile[1].name} {...profile[1]} />
        ]
      } />
    </div>
  );
};

export default Example;
```

+ `04_react_basic/src/110_props_children/start/Example.js`を編集<br>

```js:Example.js
import Profile from "./components/Profile";
import Container from "./components/Container";

const profile = [
  { name: "Takashi", age: 19, country: "Japan" },
  { name: "Jane", age: 28, country: "UK", color: "red" },
];

const Example = () => {
  return (
    <div>
      <Container title="Childrenとは？" children={
        [
          <Profile key={profile[0].name} {...profile[0]} />,
          <Profile key={profile[1].name} {...profile[1]} />
        ]
      }
        first={<Profile key={profile[0].name} {...profile[0]} />}
        second={<Profile key={profile[1].name} {...profile[1]} />}
      />
    </div>
  );
};

export default Example;
```

+ `04_react_basic/src/110_props_children/start/components/Container.js`を編集<br>

```js:container.js
import "./Container.css";

const Container = ({ title, first, second }) => {
  return (
    <div className="container">
      <h3>{title}</h3>
      {second}
      {first}
    </div>
  );
};

export default Container;
```

## 36. propsの重要なルール

+ `04_react_basic/src/120_props_rules/start/Example.js`を編集<br>

```js:Example.js
// POINT propsの流れは一方通行
// POINT propsは読み取り専用

import Bye from "./components/Bye"
import Hello from "./components/Hello"

const Example = () => {
  // POINT propsの流れは一方通行
  const name = 'Tom';

  return (
    <>
      <Hello name={name} />
      <Bye name={name} />
    </>
  );
};

export default Example;
```

+ `04_react_basic/src/120_props_rules/start/components/Hello.js`を編集(propsは読み取り専用)<br>

```js:Hello.js
const Hello = (props) => {
  props.name = 'Bob'; // 更新できない TypeError: Cannot assign to read only property 'name' of object '#<Object>'となる
  console.log(props.name);
  return (
    <div>
      <h3>Hello {props.name}</h3>
    </div>
  );
};

export default Hello;
```

+ `04_react_basic/src/120_props_rules/start/components/Hello.js`を編集(propsは読み取り専用)<br>

```js:Hello.js
const Hello = (props) => {
  // props.name = 'Bob';
  const desc= Reflect.getOwnPropertyDescriptor(props, 'name');
  console.log(desc); // {value: 'Tom', writable: false, enumerable: true, configurable: false} writableはfalseになっていて書き込み不可になっている
  // console.log(props.name);
  return (
    <div>
      <h3>Hello {props.name}</h3>
    </div>
  );
};

export default Hello;
```
