import { useSelector } from "react-redux"
const CounterResult = () => {
  const count = useSelector(state => state.counter.count);
  // console.log(state)
  return <h3>{count}</h3>;
};

export default CounterResult;