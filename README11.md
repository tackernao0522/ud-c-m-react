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

## 66. [Form] ラジオボタンの作成方法

+ `06_control_and_form/src/090_radio/start/Example.js`を編集<br>

```js:Example.js
import { useState } from "react";

const Example = () => {
  const [fruit, setFruit] = useState('Apple')
  const onChange = (e) => setFruit(e.target.value)

  const RADIO_COLLECTION = ['Apple', 'Banana', 'Cherry']

  return (
    <>
      <p style={{ textAlign: "center" }}>
        startフォルダの内容が表示されます。
        <br />
        練習用に使ってください！
      </p>
      {RADIO_COLLECTION.map((value) => (
        <label key={value}>
          <input
            type="radio"
            value={value}
            checked={fruit === value} // true or false
            onChange={onChange}
          />
          {value}
        </label>
      ))}
      <h3>{`私は${fruit}が食べたい`}</h3>
    </>
  );
};

export default Example;
```

## 67. [Form] チェックボックスの作成方法

+ `06_control_and_form/src/100_single_checkbox/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [isChecked, setIsChecked] = useState(true)

  return (
    <>
      <p style={{ textAlign: 'center' }}>
        startフォルダの内容が表示されます。
        <br />
        練習用に使ってください！
      </p>
      <label htmlFor="my-check">チェック：</label>
      <input
        type="checkbox"
        id="mycheck"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <div>{isChecked ? 'On!' : 'OFF!'}</div>
    </>
  )
}

export default Example
```

## 68. [Form] 複数選択チェックボックスの作成方法

+ `06_control_and_form/src/110_multi_checkbox/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [fruits, setFruits] = useState([
    { label: 'Apple', value: 100, checked: false },
    { label: 'Banana', value: 200, checked: false },
    { label: 'Cherry', value: 300, checked: false },
  ])

  const [sum, setSum] = useState(0)
  const handleChange = (e) => {
    const newFruits = fruits.map((fruit) => {
      const newFruit = { ...fruit }
      if (newFruit.label === e.target.value) {
        newFruit.checked = !fruit.checked
      }

      return newFruit
    })

    setFruits(newFruits)

    // let sumVal = 0
    // newFruits.forEach((fruit) => {
    //   if (fruit.checked) {
    //     sumVal += fruit.value
    //   }
    // })

    // newFruits
    //   .filter((fruit) => fruit.checked)
    //   .forEach((fruit) => (sumVal += fruit.value))

    let sumVal = newFruits
      .filter((fruit) => fruit.checked)
      .reduce((sumVal, fruit) => sumVal + fruit.value, 0)

    setSum(sumVal)
  }

  return (
    <div>
      {fruits.map((fruit) => (
        <div key={fruit.label}>
          <input
            id={fruit.label}
            type="checkbox"
            value={fruit.label}
            checked={fruit.checked}
            onChange={handleChange}
          />
          <label htmlFor={fruit.label}>
            {fruit.label}:{fruit.value}
          </label>
        </div>
      ))}
      <div>合計：{sum}</div>
    </div>
  )
}

export default Example
```

## 69. [Form] プルダウンの作成方法

+ `06_control_and_form/src/120_select/start/Example.js`を編集<br>

```js:Example.js
import { useState } from 'react'

const Example = () => {
  const [selected, setSelected] = useState('Banana')
  const OPTIONS = ['Apple', 'Banana', 'Cherry']

  return (
    <>
      <p style={{ textAlign: 'center' }}>
        startフォルダの内容が表示されます。
        <br />
        練習用に使ってください！
      </p>

      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div>選択された果物: {selected}</div>
    </>
  )
}

export default Example
```

## 70. Todoアプリを作ってみよう

+ [nanoid](https://github.com/ai/nanoid#readme)<br>

+ `$ mkdir 06_control_and_form/src/130_reminder/start/components && touch $_/{List.jsx,Form.jsx`を実行<br>

+ $ mv 06_control_and_form/src/130_reminder/start/components 06_control_and_form/src/130_reminder/start/components/Todo.jsx`を実行<br>

+ `06_control_and_form/src/130_reminder/start/components/Form.jsx`を編集<br>

```jsx:Form.jsx
const Form = () => {
  return <div>Form.jsx</div>
}

export default Form
```

+ `06_control_and_form/src/130_reminder/start/components/List.jsx`を編集<br>

```jsx:List.jsx
export const List = () => {
  return <div>List.js</div>
}
```

+ `06_control_and_form/src/130_reminder/start/Example.js`を編集<br>

```js:Example.js
import { Todo } from "./components/Todo";

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

+ `06_control_and_form/src/130_reminder/start/components/Todo.jsx`を編集<br>

```jsx:Todo.jsx
import { useState } from "react";
import Form from "./Form";
import { List } from "./List";

export const Todo = () => {
  const todosList = [
    {
      id: 1,
      content: "店予約する",
    },
    {
      id: 2,
      content: "卵買う",
    },
    {
      id: 3,
      content: "郵便出す",
    },
  ];

  const [todos, setTodos] = useState(todosList)

  return (
    <>
      <List todos={todos} />
      <Form />
    </>
  )
};
```

+ `06_control_and_form/src/130_reminder/start/components/List.jsx`を編集<br>

```jsx:List.jsx
export const List = ({ todos }) => {

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <button onClick={complete}>完了</button>
          <span>{todo.content}</span>
        </div>
      ))}
      <div>

      </div>
    </div>
  )
}
```

+ `06_control_and_form/src/130_reminder/start/components/Todo.jsx`を編集<br>

```jsx:Todo.jsx
import { useState } from 'react'
import Form from './Form'
import { List } from './List'

export const Todo = () => {
  const todosList = [
    {
      id: 1,
      content: '店予約する',
    },
    {
      id: 2,
      content: '卵買う',
    },
    {
      id: 3,
      content: '郵便出す',
    },
  ]

  const [todos, setTodos] = useState(todosList)

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(newTodos)
  }

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} />
      <Form />
    </>
  )
}
```

+ `06_control_and_form/src/130_reminder/start/components/List.jsx`を編集<br>

```jsx:List.jsx
export const List = ({ todos, deleteTodo }) => {
  const complete = (id) => deleteTodo(id)

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <button onClick={() => complete(todo.id)}>完了</button>
          <span>{todo.content}</span>
        </div>
      ))}
      <div></div>
    </div>
  )
}
```

+ `06_control_and_form/src/130_reminder/start/components/Form.jsx`を編集<br>

```jsx:Form.jsx
import { useState } from "react"

const Form = () => {
  const [enteredTodo, setEnteredTodo] = useState('')

  const addTodo = (e) => {
    const inputVal = e.target.value
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: inputVal
    }
  }

  return (
    <div>
      <input
        type="text"
        value={enteredTodo}
        onChange={(e) => setEnteredTodo(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>
      {/* <span>{enteredTodo}</span> */}
    </div>
  )
}

export default Form
```

+ `06_control_and_form/src/130_reminder/start/components/Todo.jsx`を編集<br>

```jsx:Todo.jsx
import { useState } from 'react'
import Form from './Form'
import { List } from './List'

export const Todo = () => {
  const todosList = [
    {
      id: 1,
      content: '店予約する',
    },
    {
      id: 2,
      content: '卵買う',
    },
    {
      id: 3,
      content: '郵便出す',
    },
  ]

  const [todos, setTodos] = useState(todosList)

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(newTodos)
  }

  const createTodo = (todo) => {
    setTodos([...todos, todo])
  }

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} />
      <Form createTodo={createTodo} />
    </>
  )
}
```

+ `06_control_and_form/src/130_reminder/start/components/Form.jsx`を編集<br>

```jsx:Form.jsx
import { useState } from "react"

const Form = ({createTodo}) => {
  const [enteredTodo, setEnteredTodo] = useState('')

  const addTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo
    }

    createTodo(newTodo)
  }

  return (
    <div>
      <input
        type="text"
        value={enteredTodo}
        onChange={(e) => setEnteredTodo(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>
      {/* <span>{enteredTodo}</span> */}
    </div>
  )
}

export default Form
```

+ `06_control_and_form/src/130_reminder/start/components/Form.jsx`を編集<br>

```jsx:Form.jsx
import { useState } from 'react'

const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState('')

  const addTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
    }

    createTodo(newTodo)
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button>追加</button>
        {/* <span>{enteredTodo}</span> */}
      </form>
    </div>
  )
}

export default Form
```

+ `06_control_and_form/src/130_reminder/start/components/Form.jsx`を編集<br>

```jsx:Form.jsx
import { useState } from 'react'

const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
    }

    createTodo(newTodo)
    setEnteredTodo('')
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button>追加</button>
        {/* <span>{enteredTodo}</span> */}
      </form>
    </div>
  )
}

export default Form
```
