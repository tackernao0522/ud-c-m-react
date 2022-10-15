import { CounterProvider } from './components/context/CounterContext'
import Counter from './components/Counter'

// POINT useContext x useReducer
const Example = () => {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  )
}

export default Example
