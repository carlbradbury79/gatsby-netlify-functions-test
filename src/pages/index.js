import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import InstagramSection from "../components/InstagramSection"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />

      <InstagramSection />
    </Layout>
  )
}

export default IndexPage
