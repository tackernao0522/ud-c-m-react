const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log('変更前', store.getState())
      next(action)
      console.log('変更後', store.getState())
      // storeはaction後の状態
    }
  }
}

export default logger
