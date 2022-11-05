import produce from 'immer'

const state = {
  name: 'Tom',
  hobbies: ['tennis', 'soccer'],
}

const newState = produce(state, (draft) => {
  draft.name = 'John' // immutableな操作に変換される
  draft.hobbies = 'baseball' // immutablityである
  console.log(draft) // Proxy {i: 0, A: {…}, P: false, I: false, D: {…}, …}
  // return state // returnを入れるとエラーになるので使わないこと
})

console.log(state, newState) // {name: 'Tom', hobbies: Array(2)} {name: 'John', hobbies: Array(2)}
console.log(state === newState) // false
