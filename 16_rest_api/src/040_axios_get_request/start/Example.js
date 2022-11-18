import axios from 'axios'
import { useEffect } from 'react'

const Example = () => {
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:3003/user')
      console.log(res.data)
    }
    getUser()
  })
}

export default Example
