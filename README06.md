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
