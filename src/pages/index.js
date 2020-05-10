import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

const url = ".netlify/functions/getInstagramPosts"

const fadeIn = keyframes`
from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const GramContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 400px) {
    flex-direction: column;
    width: 100%;
  }
`

const Gram = styled.div`
  background: url(${props => props.bg});

  background-size: cover;
  position: relative;
  height: 300px;

  @media (min-width: 400px) {
    flex: 1;
  }

  div {
    position: absolute;
    padding: 1rem;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    background: rgba(33, 79, 149, 0.8);
    opacity: 0;
    overflow: hidden;
    color: #fff;

    a {
      color: #fff;
      position: absolute;
      bottom: 20px;
      text-decoration: none;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
  :hover div {
    opacity: 1;
    animation: ${fadeIn} 0.3s linear;
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
          <Gram key={gram.id} bg={gram.thumbnail}>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    gram.caption.length > 150
                      ? gram.caption.slice(0, 150) + "..."
                      : gram.caption,
                }}
              ></p>
              <a href={gram.url}>
                {/* <img src={gram.thumbnail} alt={gram.caption} />{" "} */}{" "}
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </Gram>
        ))}
      </GramContainer>
    </Layout>
  )
}

export default IndexPage
