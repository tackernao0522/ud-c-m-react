## 64. コンポーネントをリファクタリング

+ `06_control_form/src/070_refactor_components/start/components`ディレクトリを作成<br>

+ `06_control_form/src/070_refactor_components/start/components/AnimalList.jsx`を作成<br>

+ `06_control_form/src/070_refactor_components/start/components/AnimalList.jsx`を編集<br>

```jsx:AnimalList.jsx
const AnimalList = ({ animals }) => {
  return (
    <ul>
      {animals.map((animal) => {
        return (
          <li key={animal}>
            {animal}
            {animal === 'Dog' && '★'}
          </li>
        )
      })}
    </ul>
  )
}

export default AnimalList
```

+ `06_control_form/src/070_refactor_components/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";
import AnimalList from "./components/AnimalList";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");
  const filteredAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1
    return isMatch
  })

  return (
    <>
      <input
        type="text"
        value={filterVal}
        onChange={(e) => setFilterVal(e.target.value)}
      />
      <AnimalList animals={filteredAnimals} />
    </>
  );
};

export default Example;
```

+ `06_control_form/src/070_refactor_components/start/components/AnimalItem.jsx`を作成<br>

+ `06_control_form/src/070_refactor_components/start/components/AnimalItem.jsx`を編集<br>

```jsx:AnimalItem.jsx
const AnimalItem = ({ animal }) => {
  return (
    <li key={animal}>
      {animal}
      {animal === 'Dog' && '★'}
    </li>
  )
}

export default AnimalItem
```

+ `06_control_form/src/070_refactor_components/start/components/AnimalList.jsx`を編集<br>

```jsx:AnimalList.jsx
import AnimalItem from "./AnimalItem"

const AnimalList = ({ animals }) => {
  return (
    <ul>
      {animals.map((animal) => {
        return (
          <AnimalItem animal={animal} />
        )
      })}
    </ul>
  )
}

export default AnimalList
```

+ `06_control_form/src/070_refactor_components/start/components/AnimalList.jsx`を編集<br>

```jsx:AnimalList.jsx
import AnimalItem from './AnimalItem'

const AnimalList = ({ animals }) => {
  if (animals.length === 0) {
    return <h3>アニマルが見つかりません。</h3>
  }
  return (
    <ul>
      {animals.map((animal) => (
        <AnimalItem animal={animal} />
      ))}
    </ul>
  )
}

export default AnimalList
```

+ `06_control_form/src/070_refactor_components/start/components/AnimalFilter.jsx`を作成<br>

+ `06_control_form/src/070_refactor_components/start/components/AnimalFilter.jsx`を編集<br>

```jsx:AnimalFilter.jsx
const AnimalFilter = ({ filterState }) => {
  const [filterVal, setFilterVal] = filterState

  return (
    <input
      type="text"
      value={filterVal}
      onChange={(e) => setFilterVal(e.target.value)}
    />
  )
}

export default AnimalFilter
```

+ `06_control_form/src/070_refactor_components/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";
import AnimalFilter from "./components/AnimalFilter";
import AnimalList from "./components/AnimalList";

const Example = () => {
  const animals = ["Dog", "Cat", "Rat"];

  const [filterVal, setFilterVal] = useState("");
  const filteredAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1
    return isMatch
  })

  return (
    <>
      <AnimalFilter filterState={[filterVal, setFilterVal]} />
      <AnimalList animals={filteredAnimals} />
    </>
  );
};

export default Example;
```

## 65. [form] inputとtextareaの作成方法

+ `06_control_and_form/src/080_input_textarea/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [val, setVal] = useState('')
  const clearVal = () => setVal('')

  return (
    <div>
      <p style={{ textAlign: 'center' }}>
        startフォルダの内容が表示されます。
        <br />
        練習用に使ってください！
      </p>

      <label htmlFor="456">ラベル</label>
      <div>
        <input
          id="123"
          placeholder="こんにちは"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <textarea
          id="456"
          placeholder="こんにちは"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      <h3>{val}</h3>
      <button onClick={clearVal}>クリア</button>
    </div>
  )
}

export default Example
```
