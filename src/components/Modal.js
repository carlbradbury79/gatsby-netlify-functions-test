import React from "react"
import { animated } from "react-spring"
import styled from "styled-components"
import OutsideClickHandler from "react-outside-click-handler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"

const InstaModal = styled(animated.div)`
  max-width: 800px;
  /* height: 100%; */
  color: gray;
  background: #fff;
  padding: 40px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: absolute;
  z-index: 90;
  top: calc(10%);
  left: calc(50% - 400px);
  display: flex;
  flex-direction: column;

  .grid {
    display: grid;
    grid-template-columns: 300px 300px;
    column-gap: 10px;
  }

  .modal-close-button {
    padding: 16px;
    background-color: #fff;
    color: #6929c4;
    font-size: 1em;
    border: none;
    margin-top: 16px;
    width: 90%;
    align-self: center;
    cursor: pointer;
    transition: background-color 0.1s linear;
  }

  .modal-close-button:hover,
  .modal-close-button:focus {
    background-color: #e8daff;
  }
`

const Modal = ({ style, closeModal, gram }) => {
  console.log("modalGram", gram[0])

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          closeModal()
        }}
      >
        <InstaModal style={style} className="modal">
          <h3 className="modal-title">Modal title</h3>
          <div className="grid">
            <img src={gram[0].thumbnail} />
            <div>
              <p className="modal-content">{gram[0].caption}</p>
              <p>
                <a href={gram[0].url}>Read on the gram</a>
              </p>
            </div>
          </div>
          <button className="modal-close-button" onClick={closeModal}>
            Close
          </button>
        </InstaModal>
      </OutsideClickHandler>
    </>
  )
}

export default Modal
