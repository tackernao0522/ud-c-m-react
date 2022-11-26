import { useRouter } from 'next/router'

export default function Setting({ query }) {
  const router = useRouter()
  console.log(router)
  return <h1>routerから取得: {router.query.name}</h1>
}

export async function getServerSideProps({ query }) {
  return {
    props: { query },
  }
}
