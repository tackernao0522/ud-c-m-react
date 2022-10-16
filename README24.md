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

## 123. [解答続き] useContextとuseReducer

+ `$ mkdir 080_practice_reminder/start/context && $_/TodoContext.jsx`を実行<br>

+ `080_practice_reminder/start/context/TodoContext.jsx`を編集<br>

```jsx:TodoContext.jsx
import { createContext, useContext } from 'react'

const TodoContext = createContext()
const TodoDispatchContext = createContext()

const TodoProvider = ({ children }) => {
  return (
    <TodoContext.Provider value={}>
      <TodoDispatchContext value={}>

      </TodoDispatchContext>
    </TodoContext.Provider>
  )
}

export const useTodos = useContext(TodoContext)
export const useDispatchTodos = useContext(TodoDispatchContext)
```

+ `080_practice_reminder/start/components/Todo.js`を編集<br>

```js:Todo.js
import { useState } from 'react'
import List from './List'
import Form from './Form'

const Todo = () => {
  // ここからカット
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

  const updateTodo = (todo) => {
    const newTodos = todos.map((_todo) => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo }
    })
    setTodos(newTodos)
  }
  // ここまでカット

  return (
    <>
      <List todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      <Form createTodo={createTodo} />
    </>
  )
}
export default Todo
```

+ `080_practice_reminder/start/context/TodoContext.jsx`を編集<br>

```jsx:TodoContext.jsx
import { createContext, useContext, useReducer } from 'react' // 編集

const TodoContext = createContext()
const TodoDispatchContext = createContext()

// 追加
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

const todoReducer = (state, action) => {
  switch(action.type) {
    case 'todo/add':
    case 'todo/delete':
    case 'todo/update':
    default:
      return state
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(newTodos)
  }

  const createTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const updateTodo = (todo) => {
    const newTodos = todos.map((_todo) => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo }
    })
    setTodos(newTodos)
  }
}
// ここまで

const TodoProvider = ({ children }) => {
  // ここから追加
  const [todos, dispatch] = useReducer(todoReducer, todosList)
  // ここまで追加

  return (
    <TodoContext.Provider value={todos}> // 編集
      <TodoDispatchContext value={dispatch}> // 編集
      </TodoDispatchContext>
    </TodoContext.Provider>
  )
}

export const useTodos = useContext(TodoContext)
export const useDispatchTodos = useContext(TodoDispatchContext)
```

+ `080_practice_reminder/start/context/TodoContext.jsx`を編集<br>

```jsx:TodoContext.jsx
import { createContext, useContext, useReducer } from 'react'

const TodoContext = createContext()
const TodoDispatchContext = createContext()

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

const todoReducer = (todos, action) => { // 編集
  switch (action.type) {
    case 'todo/add':
      return [...todos, action.todo] // 追加
    case 'todo/delete':
      // 追加
      return todos.filter((todo) => {
        return todo.id !== action.todo.id
      })
      // ここまで
    case 'todo/update':
      return todos.map((_todo) => {
        return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo }
      })
    default:
      return todos // 編集
  }

  // ここから
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(newTodos)
  }

  const createTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const updateTodo = (todo) => {
    const newTodos = todos.map((_todo) => {
      return _todo.id === todo.id ? { ..._todo, ...todo } : { ..._todo }
    })
    setTodos(newTodos)
  }
  // ここまで削除
}


const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, todosList)

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext value={dispatch}>
        {children} // 追加
      </TodoDispatchContext>
    </TodoContext.Provider>
  )
}

export const useTodos = useContext(TodoContext)
export const useDispatchTodos = useContext(TodoDispatchContext)
export default TodoProvider // 追加
```

+ `080_practice_reminder/start/components/Todo.js`を編集<br>

```js:Todo.js
import List from './List'
import Form from './Form'
import TodoProvider from '../context/TodoContext' // 追加

const Todo = () => {
  return (
    <TodoProvider> // 追加
      <List todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      <Form createTodo={createTodo} />
    </TodoProvider> // 追加
  )
}
export default Todo
```

+ `080_practice_reminder/start/components/List.js`を編集<br>

```js:List.js
import Item from './Item'

const List = () => { // propsを削除
  // 削除
  const complete = (id) => {
    deleteTodo(id)
  }
  // ここまで
  return (
    <div>
      {todos.map((todo) => (
        <Item
          todo={todo}
          complete={complete}
          key={todo.id}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  )
}

export default List
```

+ `080_practice_reminder/start/components/Todo.js`を編集<br>

```js:Todo.js
import List from './List'
import Form from './Form'
import TodoProvider from '../context/TodoContext'

const Todo = () => {
  return (
    <TodoProvider>
      <List /> // 編集
      <Form createTodo={createTodo} />
    </TodoProvider>
  )
}
export default Todo
```

+ `080_practice_reminder/start/components/List.js`を編集<br>

```js:List.js
import { useTodos } from '../context/TodoContext' // 追加
import Item from './Item'

const List = () => {
  const todos = useTodos() // 追加

  return (
    <div>
      {todos.map((todo) => (
        <Item todo={todo} key={todo.id} /> // 編集
      ))}
    </div>
  )
}

export default List
```

+ `080_practice_reminder/start/components/Item.js`を編集<br>

```js:Item.js
import { useState } from 'react'

const Item = ({ todo }) => { // propsを編集
  const [editingContent, setEditingContent] = useState(todo.content)
  const dispatch = useDispatchTodos() // 追加

  const changeContent = (e) => {
    setEditingContent(e.target.value)
  }

  const toggleEditMode = () => {
    // debugger
    const newTodo = { ...todo, editing: !todo.editing }
    dispatch({ type: 'todo/update', todo: newTodo }) // 編集
  }

  const confirmContent = (e) => {
    e.preventDefault()
    const newTodo = { ...todo, editing: !todo.editing, content: editingContent }
    dispatch({ type: 'todo/update', todo: newTodo }) // 編集
  }

  // 追加
  const complete = (todo) => {
    dispatch({ type: 'todo/delete', todo }) // todoは todo: todoの省略形
  }
  // ここまで

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo)}>完了</button> // 編集
      <form onSubmit={confirmContent} style={{ display: 'inline' }}>
        {todo.editing ? (
          <input type="text" value={editingContent} onChange={changeContent} />
        ) : (
          <span onDoubleClick={toggleEditMode}>{todo.content}</span>
        )}
      </form>
    </div>
  )
}

export default Item
```

+ `080_practice_reminder/start/context/TodoContext.jsx`を編集<br>

```jsx:TodoContext.jsx
import { createContext, useContext, useReducer } from 'react'

const TodoContext = createContext()
const TodoDispatchContext = createContext()

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

const todoReducer = (todos, action) => {
  switch (action.type) {
    case 'todo/add':
      return [...todos, action.todo]
    case 'todo/delete':
      return todos.filter((todo) => {
        return todo.id !== action.todo.id
      })
    case 'todo/update':
      return todos.map((_todo) => {
        return _todo.id === action.todo.id ? { ..._todo, ...action.todo } : { ..._todo } // 編集
      })
    default:
      return todos
  }
}

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, todosList)

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext value={dispatch}>
        {children}
      </TodoDispatchContext>
    </TodoContext.Provider>
  )
}

export const useTodos = useContext(TodoContext)
export const useDispatchTodos = useContext(TodoDispatchContext)
export default TodoProvider
```

+ `080_practice_reminder/start/components/Todo.js`を編集<br>

```js:Todo.js
import List from './List'
import Form from './Form'
import TodoProvider from '../context/TodoContext'

const Todo = () => {
  return (
    <TodoProvider>
      <List />
      <Form /> // 編集
    </TodoProvider>
  )
}
export default Todo
```

+ `080_practice_reminder/start/components/Form.js`を編集<br>

```js:Form.js
import { useState } from "react";
import { useDispatchTodos } from "../context/TodoContext"; // 追加

const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const dispatch = useDispatchTodos() // 追加

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
    };

    dispatch({ type: 'todo/add', todo: newTodo }); // 編集

    setEnteredTodo("");
  };
  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
        />
        <button>追加</button>
      </form>
    </div>
  );
};

export default Form;
```

+ `080_practice_reminder/start/context/TodoContext.jsx`を編集<br>

```jsx:TodoContext.jsx
import { createContext, useContext, useReducer } from 'react'

const TodoContext = createContext()
const TodoDispatchContext = createContext()

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

const todoReducer = (todos, action) => {
  switch (action.type) {
    case 'todo/add':
      return [...todos, action.todo]
    case 'todo/delete':
      return todos.filter((todo) => {
        return todo.id !== action.todo.id
      })
    case 'todo/update':
      return todos.map((_todo) => {
        return _todo.id === action.todo.id ? { ..._todo, ...action.todo } : { ..._todo }
      })
    default:
      return todos
  }
}

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, todosList)

  // 修正
  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  )
  // ここまで
}

export const useTodos = () => useContext(TodoContext) // 修正
export const useDispatchTodos = () => useContext(TodoDispatchContext) // 修正
export default TodoProvider
```
