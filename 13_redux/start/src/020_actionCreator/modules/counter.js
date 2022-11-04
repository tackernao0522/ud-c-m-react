const initialState = 0
const reducer = (state = initialState, { type, payload }) => {
  console.log(type)
  switch (type) {
    case 'counter/+':
      return state + payload
    case 'counter/-':
      return state - payload
    default:
      return state
  }
}

const add = (payload) => {
  return {
    type: 'counter/+',
    payload, // payload: payloadの略
  }
}

const minus = (payload) => {
  return {
    type: 'counter/-',
    payload, // payload: payloadの略
  }
}

export { reducer, add, minus }
