import matter from 'gray-matter'
import Layout from '../components/Layout'
import WorksList from '../components/WorksList'

const Index = props => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section>
        <WorksList works={props.works} />
      </section>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`)

  const works = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      const value = values[index]
      
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
      }
    })
    return data
  })(require.context('../works', true, /\.md$/))

  return {
    props: {
      works: works,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}
