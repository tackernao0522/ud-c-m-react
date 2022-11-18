import axios from 'axios'
import { useEffect, useState } from 'react'

const Example = () => {
  const [users, setUsers] = useState([]) // mapメソッドを使い際に初期値に空の配列を設定する ()だけなら users?.map((user) => ....)とする

  useEffect(() => {
    console.log('useEffect called')
    const getUser = async () => {
      const res = await axios.get('http://localhost:3003/user')
      setUsers(res.data)
    }
    getUser()
  }, [])

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>age: {user.age}</p>
          <p>hobby: {user.hobbies.join(' , ')}</p>
        </div>
      ))}
    </div>
  )
}

export default Example
