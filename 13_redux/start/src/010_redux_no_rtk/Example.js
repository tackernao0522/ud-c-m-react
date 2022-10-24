import Counter from './components/Counter'
import { Provider } from 'react-redux'
import store from "./store"

// useContext x useReducer
const Example = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

export default Example
