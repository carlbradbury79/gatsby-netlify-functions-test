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
    width: 100%;
  }
`

const Gram = styled.div`
  background: url(${props => props.bg});
  background-size: cover;
  position: relative;
  height: calc(100vw / 5);
  flex-basis: 20%;

  @media (max-width: 800px) {
    flex-basis: 50%;
    height: calc(100vw / 2);
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
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

  // The currently selected instagram photo object
  const [gramForModal, setGramForModel] = useState(false)

  // Is the modal visible
  const [modalVisible, setModalVisible] = useState(false)

  // Animation
  const transitions = useTransition(modalVisible, null, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
  })

  // Get the clicked instagram photo and set gramForModal
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
              <FontAwesomeIcon icon={faInstagram} />
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    gram.caption.length > 150
                      ? gram.caption.slice(0, 100) + "..."
                      : gram.caption,
                }}
              ></p>
            </div>
          </Gram>
        ))}
      </GramContainer>

      {/* Display Modal */}
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

      {/* Modal visibility controls the overlay */}
      {modalVisible && <InstaOverlay />}
    </Layout>
  )
}

export default IndexPage
