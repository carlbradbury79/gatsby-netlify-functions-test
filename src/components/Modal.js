import React from "react"
import { animated } from "react-spring"
import styled from "styled-components"
import OutsideClickHandler from "react-outside-click-handler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import anchorme from "anchorme"

const InstaModal = styled(animated.div)`
  max-width: 800px;
  /* height: 100%; */
  color: gray;
  background: #fff;
  padding: 40px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: fixed;
  z-index: 90;
  top: calc(10%);
  left: calc(50% - 400px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  @media (max-width: 500px) {
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    padding: 1rem;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 300px 300px;
    column-gap: 10px;

    @media (max-width: 600px) {
      grid-template-columns: 300px;
    }
  }

  .modal-close-button {
    padding: 16px;
    background-color: #fff;
    color: #6929c4;
    font-size: 1em;
    border: none;
    margin-top: 16px;
    width: 90%;
    text-align: center;
    text-decoration: none;
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
          <h3 className="modal-title">
            <FontAwesomeIcon icon={faInstagram} /> Friesland School
          </h3>
          <div className="grid">
            <img src={gram[0].thumbnail} />
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: anchorme({
                    input: gram[0].caption,
                    // use some options
                    options: {
                      attributes: {
                        target: "_blank",
                        class: "detected",
                      },
                    },
                    // and extensions
                    extensions: [
                      // an extension for hashtag search
                      {
                        test: /#(\w|_)+/gi,
                        transform: string =>
                          `<a href="https://www.instagram.com/explore/tags/${string.substr(
                            1
                          )}">${string}</a>`,
                      },
                      // an extension for mentions
                      {
                        test: /@(\w|_)+/gi,
                        transform: string =>
                          `<a href="https://www.instagram.com/${string.substr(
                            1
                          )}">${string}</a>`,
                      },
                    ],
                  }),
                }}
              />
            </div>
          </div>
          <a className="modal-close-button" href={gram[0].url}>
            <FontAwesomeIcon icon={faInstagram} /> Read on Instagram
          </a>
          <button className="modal-close-button" onClick={closeModal}>
            Close
          </button>
        </InstaModal>
      </OutsideClickHandler>
    </>
  )
}

export default Modal
