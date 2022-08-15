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
