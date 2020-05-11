import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { useTransition } from "react-spring"
import InstaModal from "../components/InstaModal"

const IndividualGram = styled.div`
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
    opacity: 1;
    overflow: hidden;
    color: #fff;

    a {
      color: #fff;
      position: absolute;
      bottom: 20px;
      text-decoration: none;
      left: 50%;
    }
  }
`

const Gram = ({ gram }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const transitions = useTransition(modalVisible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <IndividualGram bg={gram.thumbnail}>
      <div onClick={() => setModalVisible(true)}>
        <p
          dangerouslySetInnerHTML={{
            __html:
              gram.caption.length > 150
                ? gram.caption.slice(0, 150) + "..."
                : gram.caption,
          }}
        ></p>
      </div>
      {transitions.map(
        ({ item, key, props: style }) =>
          item && (
            <InstaModal
              style={style}
              closeModal={() => setModalVisible(false)}
              key={gram.id}
              gram={gram}
            />
          )
      )}
    </IndividualGram>
  )
}

export default Gram
