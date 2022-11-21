## 176. リクエストと画面処理を統合しよう

+ `16_rest_api/src/060_other_method/start/context/TodoContext.js`を編集<br>

```js:TodoContext.js
import { createContext, useContext, useEffect, useReducer } from 'react'
import todoApi from '../api/todo'

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
    case 'todo/init': // 追加
      return [...action.todos]
    case 'todo/add':
      return [...todos, action.todo]
    case 'todo/delete':
      return todos.filter((todo) => {
        return todo.id !== action.todo.id
      })
    case 'todo/update':
      return todos.map((_todo) => {
        return _todo.id === action.todo.id
          ? { ..._todo, ...action.todo }
          : { ..._todo }
      })
    default:
      return todos
  }
}

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []) // 編集
  // 追加
  useEffect(() => {
    todoApi
      .getAll(() => {})
      .then((todos) => {
        dispatch({ type: 'todo/init', todos }) // todosは todos: todosを省略している
      })
  }, [])

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  )
}

const useTodos = () => useContext(TodoContext)
const useDispatchTodos = () => useContext(TodoDispatchContext)

export { useTodos, useDispatchTodos, TodoProvider }
```

+ `15_rest_api/src/060_other_method/start/components/Form.js`を編集<br>

```js:Form.js
import { useState } from 'react'
import todoApi from '../api/todo' // 追加
import { useDispatchTodos } from '../context/TodoContext'

const Form = () => { // 編集
  const [enteredTodo, setEnteredTodo] = useState('')
  const dispatch = useDispatchTodos()

  const addTodo = (e) => {
    e.preventDefault()

    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
      editing: false,
    }

    // 追加
    todoApi.post(newTodo).then((newTodo) => {
      dispatch({ type: 'todo/add', todo: newTodo })
      setEnteredTodo('')
    })
    // ここまで
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
      </form>
    </div>
  )
}

export default Form
```

+ Todoを追加すると`db.json`に追加されている<br>

+ `16_rest_api/src/060_other_method/start/components/Item.js`を編集<br>

```js:Item.js
import { useState } from 'react'
import todoApi from '../api/todo' // 追加
import { useDispatchTodos } from '../context/TodoContext'

const Item = ({ todo }) => {
  const [editingContent, setEditingContent] = useState(todo.content)
  const dispatch = useDispatchTodos()

  const changeContent = (e) => setEditingContent(e.target.value)

  const toggleEditMode = () => {
    const newTodo = { ...todo, editing: !todo.editing }
    dispatch({ type: 'todo/update', todo: newTodo })
  }

  const confirmContent = (e) => {
    e.preventDefault()
    const newTodo = {
      ...todo,
      editing: !todo.editing,
      content: editingContent,
    }
    dispatch({ type: 'todo/update', todo: newTodo })
  }

  // 編集
  const complete = (todo) => {
    todoApi.delete(todo).then(() => {
      dispatch({ type: 'todo/delete', todo })
    })
  }

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo)}>完了</button>
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

+ これでdeleteも完了<br>

+ `16_rest_api/src/060_other_method/start/components/Item.js`を編集<br>

```js:Item.js
import { useState } from 'react'
import todoApi from '../api/todo'
import { useDispatchTodos } from '../context/TodoContext'

const Item = ({ todo }) => {
  const [editingContent, setEditingContent] = useState(todo.content)
  const dispatch = useDispatchTodos()

  const changeContent = (e) => setEditingContent(e.target.value)

  const toggleEditMode = () => {
    const newTodo = { ...todo, editing: !todo.editing }
    dispatch({ type: 'todo/update', todo: newTodo })
  }

  const confirmContent = (e) => {
    e.preventDefault()
    const newTodo = {
      ...todo,
      editing: !todo.editing,
      content: editingContent,
    }
    // 追加
    todoApi.patch(newTodo).then((newTodo) => {
      dispatch({ type: 'todo/update', todo: newTodo })
    })
    // ここまで
  }

  const complete = (todo) => {
    todoApi.delete(todo).then(() => {
      dispatch({ type: 'todo/delete', todo })
    })
  }

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo)}>完了</button>
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

+ これでupdateは完了<br>

+ `16_rest_api/src/060_other_method/start/components/Item.js`を編集<br>

```js:Item.js
import { useState } from 'react'
import todoApi from '../api/todo'
import { useDispatchTodos } from '../context/TodoContext'

const Item = ({ todo }) => {
  const [editingContent, setEditingContent] = useState(todo.content)
  const dispatch = useDispatchTodos()

  const changeContent = (e) => setEditingContent(e.target.value)

  // 編集
  const toggleEditMode = () => {
    const newTodo = { ...todo, editing: !todo.editing }
    todoApi.patch(newTodo).then((newTodo) => {
      dispatch({ type: 'todo/update', todo: newTodo })
    })
  }

  const confirmContent = (e) => {
    e.preventDefault()
    const newTodo = {
      ...todo,
      editing: !todo.editing,
      content: editingContent,
    }
    todoApi.patch(newTodo).then((newTodo) => {
      dispatch({ type: 'todo/update', todo: newTodo })
    })
  }

  const complete = (todo) => {
    todoApi.delete(todo).then(() => {
      dispatch({ type: 'todo/delete', todo })
    })
  }

  return (
    <div key={todo.id}>
      <button onClick={() => complete(todo)}>完了</button>
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

+ editingのboolean値が変わる<br>

## 177. [発展] ダイナミックインポートとは？

+ `16_rest_api/src/070_synamic_import/start/Example.js`を編集<br>

```js:Example.js
import { add } from "./add";

const Example = () => {
  console.log(add(1, 2)) // 3
};

export default Example;
```

+ `16_rest_api/src/070_synamic_import/start/Example.js`を編集<br>

```js:Example.js
// import { add } from "./add";

const Example = () => {
  import("./add").then((module) => {
    console.log(module)
  })
  // console.log(add(1, 2))
};

export default Example;
```

```
Module {__esModule: true, Symbol(Symbol.toStringTag): 'Module'}
add
:
(a, b) => a + b
length
:
2
name
:
"add"
arguments
:
(...)
caller
:
(...)
[[FunctionLocation]]
:
add.js:1
[[Prototype]]
:
ƒ ()
[[Scopes]]
:
Scopes[2]
__esModule
:
true
Symbol(Symbol.toStringTag)
:
"Module"
get add
:
() => (/* binding */ add)
[[Prototype]]
:
Object
```

+ `16_rest_api/src/070_dynamic_import/start/add.js`を編集<br>

```js:add.js
export const add = (a, b) => a + b
// eslint-disable-next-line import/no-anonymous-default-export
export default 3 // consoleを確認すると default: 3というのが確認できる
```

+ `16_rest_api/src/070_synamic_import/start/Example.js`を編集(下記の書き方もできる)<br>

```js:Example.js
// eslint-disable-next-line no-unused-vars
// import { add } from './add'

const Example = () => {
  const dynamicImport = async () => {
    const module = await import('./add')
    console.log(module)
  }
  dynamicImport()
  // console.log(add(1, 2))
}

export default Example
```

## 178. [発展] コンポーネントのダイナミックインポート

+ `16_rest_api/src/080_react_lazy/start/Example.js`を編集<br>

```js:Example.js
import { lazy, useState } from "react";
// import ComponentA from "./components/ComponentA";

const LazyComponentA = lazy(() => import('./components/ComponentA')) // 追加

const Example = () => {
  const [compA, setCompA] = useState(false);

  return (
    <>
      <button onClick={() => setCompA((prev) => !prev)}>ComponentA</button>
      {compA && <LazyComponentA />} // 編集
    </>
  );
};

console.log('loaded component')

export default Example;
```

+ `16_rest_api/src/080_react_lazy/start/components/ComponentA.js`を編集<br>

```js:Component.js
const ComponentA = () => {
  return <h3>Loaded ComponentA!</h3>;
};

console.log('loaded componentsA') // 追加

export default ComponentA;
```

+ `16_rest_api/src/080_react_lazy/start/Example.js`を編集<br>

```js:Example.js
import { lazy, Suspense, useState } from 'react'
// import ComponentA from "./components/ComponentA";

const LazyComponentA = lazy(() => import('./components/ComponentA'))

const Example = () => {
  const [compA, setCompA] = useState(false)

  return (
    <>
      <button onClick={() => setCompA((prev) => !prev)}>ComponentA</button>
      // 編集
      <Suspense fallback={<div>Loading!!!!!!!!</div>}>
        {compA && <LazyComponentA />}
      </Suspense>
      // ここまで
    </>
  )
}

export default Example
```

+ `16_rest_api/src/080_react_lazy/start/Example.js`を編集<br>

```js:Example.js
import { lazy, Suspense, useState } from 'react'
// import ComponentA from "./components/ComponentA";

const LazyComponentA = lazy(() => import('./components/ComponentA'))
const LazyComponentB = lazy(() => import('./components/ComponentB')) // 追加

const Example = () => {
  const [compA, setCompA] = useState(true) // 編集

  return (
    <>
      <button onClick={() => setCompA((prev) => !prev)}>ComponentA</button>
      // 編集
      <Suspense fallback={<div>Loading!!!!!!!!</div>}>
        {compA ? <LazyComponentA /> : <LazyComponentB />}
      </Suspense>
      // ここまで
    </>
  )
}

export default Example
```

+ `16_rest_api/src/080_react_lazy/start/Example.js`を編集<br>

```js:Example.js
import { lazy, startTransition, Suspense, useState } from 'react' // 編集
// import ComponentA from "./components/ComponentA";

const LazyComponentA = lazy(() => import('./components/ComponentA'))
const LazyComponentB = lazy(() => import('./components/ComponentB'))

const Example = () => {
  const [compA, setCompA] = useState(true)

  return (
    <>
      // 編集
      <button
        onClick={() => {
          startTransition(() => {
            setCompA((prev) => !prev)
          })
        }}
      >
        ComponentA
      </button>
      // ここまで
      <Suspense fallback={<div>Loading!!!!!!!!</div>}>
        {compA ? <LazyComponentA /> : <LazyComponentB />}
      </Suspense>
    </>
  )
}

export default Example
```
