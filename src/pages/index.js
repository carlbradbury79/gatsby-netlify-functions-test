import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const url = ".netlify/functions/getInstagramPosts"

const GramContainer = styled.div`
  display: flex;
  flex-direction: row;
  a {
    flex: 1;
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
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Netlify/Gatsby Functions Test</h1>
      <GramContainer>
        {gramz.map(gram => (
          <a href={gram.url} key={gram.id}>
            <img src={gram.thumbnail} alt={gram.caption} />{" "}
            <p dangerouslySetInnerHTML={{ __html: gram.caption }}></p>
          </a>
        ))}
      </GramContainer>
    </Layout>
  )
}

export default IndexPage
