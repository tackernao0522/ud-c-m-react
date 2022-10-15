## 122. [解答] useContextとuseReducer

+ `$ touch src/080_practice_reminder/start/components/Item.jsx`を実行<br>

+ `src/080_practice_reminder/start/components/Item.jsx`を編集<br>

```jsx:Item.jsx
const Item = ({ todo, complete }) => {
  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo.id)}>完了</button>
      <span>{todo.content}</span>
    </div>
  )
}

export default Item
```

+ `src/080_practice_reminder/start/components/List.js`を編集<br>

```jsx:List.js
import Item from './Item'

const List = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id)
  }
  return (
    <div>
      {todos.map((todo) => (
        <Item todo={todo} complete={complete} key={todo.id} /> // 編集
      ))}
    </div>
  )
}

export default List
```

+ `src/080_practice_reminder/start/components/Item.jsx`を編集<br>

```jsx:Item.jsx
import { useState } from 'react' // 追加

const Item = ({ todo, complete }) => {
  const [editingContent, setEditingContent] = useState(todo.content) // 追加

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo.id)}>完了</button>
      <span>{todo.content}</span>
    </div>
  )
}

export default Item
```

+ `src/080_practice_reminder/start/components/Todo.js`を編集<br>

```jsx:Todo.js
import { useState } from "react"
import List from "./List"
import Form from "./Form"

const Todo = () => {
  const todosList = [
    {
      id: 1,
      content: "店予約する",
      editing: false // 追加
    },
    {
      id: 2,
      content: "卵買う",
      editing: false // 追加
    },
    {
      id: 3,
      content: "郵便出す",
      editing: false // 追加
    },
  ];

  const [ todos, setTodos ] = useState(todosList);

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  const createTodo = (todo) => {
    setTodos([...todos, todo]);
  }

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo}/>
      <Form createTodo={createTodo}/>
    </>
  )
};
export default Todo;
```

+ `src/080_practice_reminder/start/components/Item.jsx`を編集<br>

```jsx:Item.jsx
import { useState } from 'react'

const Item = ({ todo, complete }) => {
  const [editingContent, setEditingContent] = useState(todo.content)

  const changeContent = (e) => {
    setEditingContent(e.target.value)
  }

  // 追加
  const toggleEditMode = () => {
    const newTodo = { ...todo, editing: !todo.editing}
  }
  // ここまで

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo.id)}>完了</button>
      // 編集
      {todo.editing ? (
        <input type="text" value={editingContent} onChange={changeContent} />
      ) : (
        <span onDoubleClick={toggleEditMode}>{todo.content}</span>
      )}
      // ここまで
    </div>
  )
}

export default Item
```

+ `src/080_practice_reminder/start/components/Todo.js`を編集<br>

```jsx:Todo.js
import { useState } from 'react'
import List from './List'
import Form from './Form'

const Todo = () => {
  const todosList = [
    {
      id: 1,
      content: '店予約する',
      editing: false,
    },
    {
      id: 2,
      content: '卵買う',
      editing: false,
    },
    {
      id: 3,
      content: '郵便出す',
      editing: false,
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

  // 追加
  const updateTodo = (todo) => {
    const newTodos = todos.map((_todo) => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo }
    })
    setTodos(newTodos)
  }
  // ここまで

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} /> // 編集
      <Form createTodo={createTodo} />
    </>
  )
}
export default Todo
```

+ `src/080_practice_reminder/start/components/List.js`を編集<br>

```js:List.js
import Item from './Item'

const List = ({ todos, deleteTodo, updateTodo }) => { // 編集
  const complete = (id) => {
    deleteTodo(id)
  }
  return (
    <div>
      {todos.map((todo) => (
        <Item
          todo={todo}
          complete={complete}
          key={todo.id}
          updateTodo={updateTodo} // 追加
        />
      ))}
    </div>
  )
}

export default List
```

+ `src/080_practice_reminder/start/components/Item.jsx`を編集<br>

```jsx:Item.jsx
import { useState } from 'react'

const Item = ({ todo, complete, updateTodo }) => {
  const [editingContent, setEditingContent] = useState(todo.content)

  const changeContent = (e) => {
    setEditingContent(e.target.value)
  }

  const toggleEditMode = () => {
    // debugger
    const newTodo = { ...todo, editing: !todo.editing }
    updateTodo(newTodo)
  }

  // 追加
  const confirmContent = (e) => {
    e.preventDefault()
    const newTodo = { ...todo, editing: !todo.editing, content: editingContent }
    updateTodo(newTodo)
  }
  // ここまで

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo.id)}>完了</button>
      <form onSubmit={confirmContent} style={{ display: 'inline' }}> // 追加
        {todo.editing ? (
          <input type="text" value={editingContent} onChange={changeContent} />
        ) : (
          <span onDoubleClick={toggleEditMode}>{todo.content}</span>
        )}
      </form> // 追加
    </div>
  )
}

export default Item
```
