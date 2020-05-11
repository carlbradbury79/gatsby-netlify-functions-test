import React from "react"
import styled from "styled-components"
import { animated } from "react-spring"

const Modal = styled(animated.div)`
  div {
    width: 400px;
    height: 250px;
    color: #fff;
    background: #6929c4;
    padding: 40px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: absolute;
    z-index: 190;
    top: calc(50% - 145px);
    left: calc(50% - 220px);
    display: flex;
    flex-direction: column;
  }
`

const InstaModal = ({ gram, closeModal, style }) => {
  return (
    <Modal style={style}>
      <div>
        <p>{gram.caption}</p>
        <button className="modal-close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default InstaModal
