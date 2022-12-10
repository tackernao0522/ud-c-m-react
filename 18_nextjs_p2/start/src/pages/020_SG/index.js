// Static Site Generation
export default function IndexPage({ message }) {
  return <h3>5G:{message}</h3>
}

export async function getStaticProps() {
  console.log('getStaticProps')

  return {
    props: { message: 'From Static Props' },
  }
}
