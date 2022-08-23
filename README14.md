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

## 82. [付録] ChakraUIを使ってみよう[Part3]

+ [Variant](https://chakra-ui.com/docs/components/input)<br>

+ `<HStack>`はhrizonタグで横並びを意味する<br>

+ `07_styling_component/src/050_chakra_ui/start/components/List.js`を編集<br>

```js:List.js
import { HStack, IconButton, StackDivider, Text, VStack } from '@chakra-ui/react'
import { VscCheck } from 'react-icons/vsc'

const List = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id)
  }
  return (
    <VStack
      // color={{ sm: 'red.600', md: 'blue.600', lg: 'green.500', xl: 'red.600' }}
      divider={<StackDivider />}
      borderColor="black.100"
      borderWidth="1px"
      borderRadius="3px"
      p={5}
      alignItems="start"
    >
      {todos.map((todo) => {
        return (
          <HStack key={todo.id} spacing="5">
            <IconButton
              onClick={() => complete(todo.id)}
              icon={<VscCheck />}
              isRound
              bgColor="cyan.100"
              opacity="0.5"
            >
              完了
            </IconButton>
            <Text>{todo.content}</Text>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default List
```

+ `07_styling_component/src/050_chakra_ui/start/components/Form.js`を編集<br>

```js:Form.js
import { Button, HStack, Input, useToast } from '@chakra-ui/react'
import { useState } from 'react'
const Form = ({ createTodo }) => {
  const [enteredTodo, setEnteredTodo] = useState('')

  const toast = useToast()

  const addTodo = (e) => {
    e.preventDefault()

    if (!enteredTodo) {
      toast({
        title: '新しいタスクを入力してください',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      return
    }

    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
    }

    createTodo(newTodo)

    setEnteredTodo('')

    toast({
      title: '新しいタスクを追加しました！',
      description: enteredTodo,
      status: 'info',
      duration: 3000, // どれくらいの時間表示するか
      isClosable: true, // xの部分
    })
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <HStack>
          <Input
            placeholder="新しいタスク"
            _placeholder={{ opacity: '0.3', color: 'gray.500' }}
            size="lg"
            p={3}
            bgColor="white"
            variant="flushed" // 入力欄のスタイル
            value={enteredTodo}
            onChange={(e) => setEnteredTodo(e.target.value)}
          />
          <Button
            colorScheme="blue"
            size="md"
            bgColor="white"
            variant="outline"
            px={7}
            type="submit"
          >
            追加
          </Button>
        </HStack>
      </form>
    </div>
  )
}

export default Form
```

+ [Heading(フォントのサイズが変更される)](https://chakra-ui.com/docs/components/heading/usage)<br>

+ `07_styling_component/src/050_chakra_ui/start/components/Todo.js`を編集<br>

```js:Todo.js
import { useState } from 'react'
import List from './List'
import Form from './Form'
import { Heading, VStack } from '@chakra-ui/react'

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
    <VStack p="10" spacing="10">
      <Heading color="blue.200" fontSize="5xl">
        Reminder
      </Heading>
      <List todos={todos} deleteTodo={deleteTodo} />
      <Form createTodo={createTodo} />
    </VStack>
  )
}
export default Todo
```

+ `07_styling_component/src/050_chakra_ui/start/components/List.js`を編集<br>

```js:List.js
import { HStack, IconButton, StackDivider, Text, VStack } from '@chakra-ui/react'
import { VscCheck } from 'react-icons/vsc'

const List = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id)
  }
  return (
    <VStack
      width="80%" // 追加
      bgColor="white" // 追加
      // color={{ sm: 'red.600', md: 'blue.600', lg: 'green.500', xl: 'red.600' }}
      divider={<StackDivider />}
      borderColor="blackAlpha.100" // 修正
      borderWidth="1px"
      borderRadius="3px"
      p={5}
      alignItems="start"
    >
      {todos.map((todo) => {
        return (
          <HStack key={todo.id} spacing="5">
            <IconButton
              onClick={() => complete(todo.id)}
              icon={<VscCheck />}
              isRound
              bgColor="cyan.100"
              opacity="0.5"
            >
              完了
            </IconButton>
            <Text>{todo.content}</Text>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default List
```
