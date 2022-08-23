## 80. [付録] ReactでのCSSフレームワーク [Part.1]

+ 動画参照<br>

## 81. [付録] ChakraUIを使ってみよう[Part.2]

+ [chakraUI インストール](https://chakra-ui.com/getting-started/cra-guide)<br>

+ [色情報](https://chakra-ui.com/docs/styled-system/theme)<br>

+ [Spacing](https://chakra-ui.com/docs/styled-system/theme?scroll=true#spacing)<br>

+ `07_styling_component/src/050_chakra_ui/start/Example.js`を編集<br>

```js:Example.js
import { ChakraProvider } from "@chakra-ui/react";

import Todo from "./components/Todo";

const Example = () => {
  return (
    <>
    <ChakraProvider>
      <Todo />
    </ChakraProvider>
    </>
  );
};

export default Example;
```

+ `07_styling_component/src/050_chakra_ui/start/components/Todo.js`を編集<br>

```js:Todo.js
import { useState } from 'react'
import List from './List'
import Form from './Form'

const Todo = () => {
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
      <h2>Reminder</h2>
      <List todos={todos} deleteTodo={deleteTodo} />
      <Form createTodo={createTodo} />
    </>
  )
}
export default Todo
```
+ [Divider](https://chakra-ui.com/docs/components/stack#vstack)<br>

+ `<VStack>`は縦並びのコンポーネントを定義するときに使う<br>

+ `07_styling_component/src/050_chakra_ui/start/components/List.js`を編集<br>

```js:List.js
import { StackDivider, VStack } from '@chakra-ui/react'

const List = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id)
  }
  return (
    <VStack
      color={{ sm: 'red.600', md: 'blue.600', lg: 'green.500', xl: 'red.600' }}
      divider={<StackDivider />}
      borderColor="black.100"
      borderWidth="1px"
      borderRadius="3px"
      p={5}
      alignItems="start"
    >
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <button onClick={() => complete(todo.id)}>完了</button>
            <span>{todo.content}</span>
          </div>
        )
      })}
    </VStack>
  )
}

export default List
```
