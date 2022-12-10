export default function Page({ id }) {
  return <h3>このページは{id}です。</h3>
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  }
}
