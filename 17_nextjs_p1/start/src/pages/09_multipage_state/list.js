import { useRouter } from 'next/router'
import List from '../../components/list'
import { useAppContext } from '../../context/AppContext'

export default function PageList() {
  const [list] = useAppContext()
  const router = useRouter()

  return (
    <>
      <List list={list} />
      <button onClick={() => router.back()}>前のページへ</button>
    </>
  )
}
