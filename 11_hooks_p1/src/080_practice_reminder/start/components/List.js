import Item from './Item'

const List = ({ todos, deleteTodo, updateTodo }) => {
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
          updateTodo={updateTodo}
        />
      ))}
    </div>
  )
}

export default List
