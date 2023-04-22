import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { MdVideoCall, MdContentPaste } from "react-icons/md";
import styled from "styled-components";
import { SocketContext } from "./SocketContext";

function MakeCall({ makeCall, showMakeCall }) {
  const [pasteValue, setPasteValue] = useState("");
  const { callUser } = useContext(SocketContext);
  const makeCallVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100px" },
  };
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setPasteValue(text);
  };
  return (
    <>
      <MakeCallContainer
        initial={{ opacity: 0, y: "-100px" }}
        animate={showMakeCall ? "open" : "closed"}
        variants={makeCallVariants}
        exit={{ opacity: 0, y: "-100px" }}
      >
        <h1>Add Mate</h1>
        <div className="input--container">
          <input type="text" placeholder="Paste Caller ID" value={pasteValue} />
          <MdContentPaste onClick={() => handlePaste()} />
        </div>
        <button onClick={() => callUser(pasteValue)}>
          CALL
          <MdVideoCall />
        </button>
      </MakeCallContainer>
    </>
  );
}

const MakeCallContainer = styled(motion.aside)`
  padding-inline: 1rem;
  padding-block: 1rem;
  border-radius: 10px;
  padding-bottom: 1.1rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  display: block;
  @media screen and (max-width: 1023px) {
    background-color: white;
    border: 1px solid #141e30; 
  }
  h1 {
    font-size: 1.6rem;
    padding-bottom: 10px;
    border-bottom: 1px solid whitesmoke;
    margin-bottom: 1.25rem;
  }
  input,
  button {
    display: block;
  }
  .input--container {
    display: flex;
    align-items: center;
    position: relative;
    input {
      width: 100%;
      height: 3rem;
      border-radius: 10px;
      outline: none;
      border: 1px solid whitesmoke;
      text-indent: 10px;
      font-size: 1rem;
      &:focus {
        border-color: #141e30;
      }
    }
    svg {
      position: absolute;
      right: 0;
      font-size: 1.5rem;
      margin-right: 10px;
      color: #00000085;
      cursor: pointer;
      &:hover {
        color: #141e30;
      }
    }
  }
  button {
    padding-inline: 2rem;
    height: 3rem;
    margin-top: 1rem;
    background-color: deepskyblue;
    color: white;
    outline: none;
    border: 0;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    svg {
      font-size: 1.5rem;
      margin-left: 10px;
    }
  }
`;

export default MakeCall;
