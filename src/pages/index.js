import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

import IndividualGram from "../components/Gram"

const url = ".netlify/functions/getInstagramPosts"

const GramContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 400px) {
    flex-direction: column;
    width: 100%;
  }
`

function useInstagram() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
  }, [])
  console.log(posts)
  return posts
}

const IndexPage = () => {
  const gramz = useInstagram()

  console.log(gramz)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Netlify/Gatsby Functions Test</h1>
      <GramContainer>
        {gramz.map(gram => (
          <IndividualGram key={gram.id} gram={gram} />
        ))}
      </GramContainer>
    </Layout>
  )
}

export default IndexPage
