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
