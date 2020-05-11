import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import Modal from "../components/Modal"
import { useTransition } from "react-spring"
import InstaOverlay from "../components/InstaOverlay"

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
  z-index: 50;

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
    cursor: pointer;
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

  const [gramForModal, setGramForModel] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)
  const transitions = useTransition(modalVisible, null, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
  })

  function getGram(id) {
    const newGram = gramz.filter(g => {
      console.log("getGram", id, g.id)
      return g.id === id
    })
    console.log("newGram", newGram)
    setGramForModel(newGram)
    console.log("state", gramForModal)
    setModalVisible(true)
  }

  console.log(gramz)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Netlify/Gatsby Functions Test</h1>

      <GramContainer>
        {gramz.map(gram => (
          <Gram
            key={gram.id}
            bg={gram.thumbnail}
            // onClick={() => setModalVisible(true)}
            onClick={() => getGram(gram.id)}
          >
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
      {transitions.map(
        ({ item, key, props: style }) =>
          item && (
            <Modal
              style={style}
              closeModal={() => setModalVisible(false)}
              key={key}
              gram={gramForModal}
            />
          )
      )}
      {modalVisible && <InstaOverlay />}
    </Layout>
  )
}

export default IndexPage
