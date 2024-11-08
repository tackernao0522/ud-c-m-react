# セクション6: 制御構文とフォームの制御

## 58. 配列をリスト表示

+ `06_control_and_form/src/010_list_components/start/Example.js`を編集(part1)<br>

```js:Example.js

const animals = ["Dog", "Cat", "Rat"];

const Example = () => {

  const animalList = []
  for(const animal of animals) {
    animalList.push(<li>Hello, {animal}</li>)
  }

  return (
    <>
      <h3>配列の操作</h3>
      <ul>
        {animalList}
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/010_list_components/start/Example.js`を編集(part2)<br>

```js:Example.js

const animals = ["Dog", "Cat", "Rat"];

const Example = () => {

  // const animalList = []
  // for(const animal of animals) {
  //   animalList.push(<li>Hello, {animal}</li>)
  // }

  const helloAnimals = animals.map((animal) => <li>Hello, {animal}</li>)

  return (
    <>
      <h3>配列の操作</h3>
      <ul>
        {helloAnimals}
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/010_list_components/start/Example.js`を編集(part3)<br>

```js:Example.js
const animals = ["Dog", "Cat", "Rat"];

const Example = () => {

  // const animalList = []
  // for(const animal of animals) {
  //   animalList.push(<li>Hello, {animal}</li>)
  // }

  return (
    <>
      <h3>配列の操作</h3>
      <ul>
        {animals.map((animal) => (
          <li key={animal}>
            {`Hello, ${animal}`}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

## 59. [重要] リストには必ずキーを設定

+ `06_control_and_form/src/020_list_and_key/start/Example.js`を編集<br>

```js:Example.js

const animals = ["Dog", "Cat", "Rat"];

const Example = () => {
  const animalList = [];
  for (const animal of animals) {
    animalList.push(<li>{animal}</li>);
  }

  // const helloAnimals = animals.map((animal) => {
  //   return <li>Hello {animal}</li>;
  // });

  return (
    <>
      <ul>
        {/* <li>{animals[0]}</li>
        <li>{animals[1]}</li>
        <li>{animals[2]}</li> */}
        {/* {animalList}
        {helloAnimals} */}
        {/* {animalList} */}

        {animals.map((animal) => <li key={animal}>Hello, {animal}</li>)}
      </ul>
    </>
  );
};

export default Example;
```

### keyを付ける際の注意点

+ キーには必ず一意の値を設定する。<br>

+ キーに設定した値は変更しない。<br>

+ 配列のインデックスはなるべく使わない。-> 画面で確認<br>


## 60. [練習] リストにキーを設定してみよう

+ `06_control_and_from/src/030_practice_list/start/Example.js`を編集(Part1)<br>

```js:Example.js
import Profile from "./components/Profile";

const persons = [
  {
    name: 'Geo',
    age: 18,
    hobbies: ['sports', 'music']
  },
  {
    name: 'Tom',
    age: 25,
    hobbies: ['movie', 'music']
  },
  {
    name: 'Lisa',
    age: 21,
    hobbies: ['sports', 'taravel', 'game']
  },
]

const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>Profileコンポーネントを使用して、完成コードと同じ画面を作成してください。</p>
      <p>また、Profileコンポーネント内のリスト表示部分にkeyを設定して、ワーニング表示がされないようにしてください。</p>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Profile person={person} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_from/src/030_practice_list/start/components/Profile.js`を編集(Part1)<br>

```js:Profile.js
const Profile = (props) => {
  console.log(props);
  const {person} = props
  return (
    <div>
      <hr />
      <div>Name: {person.name}</div>
      <div>Age: {person.age}</div>
      <div>
        <div>Hobby:</div>
        <ul>
          {person.hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
```

+ `06_control_and_from/src/030_practice_list/start/Example.js`を編集(Part2)<br>

```js:Example.js
import Profile from "./components/Profile";

const persons = [
  {
    name: 'Geo',
    age: 18,
    hobbies: ['sports', 'music']
  },
  {
    name: 'Tom',
    age: 25,
    hobbies: ['movie', 'music']
  },
  {
    name: 'Lisa',
    age: 21,
    hobbies: ['sports', 'taravel', 'game']
  },
]

const Example = () => {
  return (
    <>
      <h3>練習問題</h3>
      <p>Profileコンポーネントを使用して、完成コードと同じ画面を作成してください。</p>
      <p>また、Profileコンポーネント内のリスト表示部分にkeyを設定して、ワーニング表示がされないようにしてください。</p>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Profile {...person} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_from/src/030_practice_list/start/components/Profile.js`を編集(Part2)<br>

```js:Profile.js
const Profile = ({ name, age, hobbies }) => {
  return (
    <div>
      <hr />
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>
        <div>Hobby:</div>
        <ul>
          {hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
```

## 61. 配列のフィルターメソッドの使い方

`06_control_and_form/src/040_list_and_filter/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const animals = ["Dog", "Cat", "Rat"];

const Example = () => {
  const [filterVal, setFilterVal] = useState("")
  return (
    <>
      <h3>配列のフィルター</h3>
      <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1
            return isMatch;
        })
          .map((animal) => (
            <li key={animal}>{animal}</li>
          ))}
      </ul>
    </>
  );
};

export default Example;
```

`06_control_and_form/src/040_list_and_filter/start/Example.js`を編集(確認)<br>

```js:Example.js
import { useState } from "react";

const animals = ["Dog", "Cat", "Rat"];

const Example = () => {
  const [filterVal, setFilterVal] = useState("")

  console.log(animals.filter((animal) => animal === 'Dog')) // ['Dog']
  return (
    <>
      <h3>配列のフィルター</h3>
      <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1
            console.log(animal.indexOf(filterVal))
            return isMatch
          })
          .map((animal) => (
            <li key={animal}>{animal}</li>
          ))}
      </ul>
    </>
  );
};

export default Example;
```

## 62. [練習] フィルターメソッドの使い方を練習してみよう

+ `06_control_and_form/src/050_practice_filter/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'
import Profile from "./components/Profile";

const persons = [
  {
    name: "Geo",
    age: 18,
    hobbies: ["sports", "music"],
  },
  {
    name: "Tom",
    age: 25,
    hobbies: ["movie", "music"],
  },
  {
    name: "Lisa",
    age: 21,
    hobbies: ["sports", "travel", "game"],
  },
];

const Example = () => {
  const [filterVal, setFilterVal] = useState("")
  return (
    <>
      <h3>練習問題</h3>
      <p>入力欄を設置して、入力値と名前が一致したもののみ表示する仕組みを作成してください。</p>
      <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
      <ul>
        {persons
          .filter((person) => {
            const isMath = person.name.indexOf(filterVal) !== -1
            return isMath
          })
          .map((person) => (
            <li key={person.name}>
              <Profile {...person} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default Example;
```

## 63. 条件分岐を設ける方法まとめ

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => {
            if (animal === "Dog") {
              return <li key={animal}>{animal}★</li>
            } else {
              return <li key={animal}>{animal}</li>
            }
          })
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子1)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => (
            animal === "Dog" ? <li key={animal}>{animal}★</li> : (
              <li key={animal}>{animal}</li>
            )
          ))
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子2)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => {
            return <li key={animal}>
              {
                animal === "Dog"
                  ? animal + "★"
                  : animal
              }
            </li>
          })
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子3)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => (
            <li key={animal}>
              {animal === "Dog" ? animal + "★" : animal}
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子4)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => (
            <li key={animal}>
              {
                animal + (animal === "Dog"
                ? "★"
                : "")
              }
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子4)falseという文字列が出てしまう<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => {
            return <li key={animal}>
              {
                animal + (animal === "Dog" && "★")
              }
            </li>
          })
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子5)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => {
            return <li key={animal}>
              {
                animal
              }{animal === "Dog" && "★"}
            </li>
          })
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(三項演算子6)<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => (
            <li key={animal}>
              {animal}{animal === "Dog" && "★"}
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(Null合体演算子)null or undefinedの時<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", null, "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const animalStr = animal ?? ""
            const isMatch = animalStr.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((animal) => (
            <li key={animal}>
              {animal}{animal === "Dog" && "★"}
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Example;
```

+ `06_control_and_form/src/060_conditional_render/start/Example.js`を編集(Null合体演算子)null or undefinedの時2<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const animals = ["Dog", "Cat", null, "Rat"];

  const [filterVal, setFilterVal] = useState("");

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <ul>
        {animals
          .filter((animal) => {
            const animalStr = animal ?? ""
            const isMatch = animalStr.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((animal) => (
            <li key={animal}>
              {animal ?? "null,udefinedでした"}{animal === "Dog" && "★"}
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Example;
```
