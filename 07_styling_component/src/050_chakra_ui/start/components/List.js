import { StackDivider, VStack } from '@chakra-ui/react'

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
