import { useEffect, useState } from 'react'

export default function SSR() {
  console.log('hello')

  useEffect(() => {
    window.localStorage.setItem('key', 'value')
  }, [])

  const [state, setState] = useState('bye')
  const val = 0
  return <h3>{state}</h3>
}
