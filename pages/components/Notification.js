import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "./SocketContext";

function Notification() {
  const { call, callAccepted, answerCall, setCall } = useContext(SocketContext);
  const [showNotice, setShowNotice] = useState(false);

  const animateVariant = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100px" },
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >

      {
        call.isReceivingCall &&
        <Container
          initial={{ opacity: 0, y: "-100px" }}
          animate={!callAccepted ? "open" : "closed"}
          variants={animateVariant}
        >
          <p>{call.name ? call.name : "Unknown"} is calling...</p>
          <div className="buttons">
            <button className="answer" onClick={() => answerCall()}>Answer</button>
            <button className="reject" onClick={() => setCall(prev => prev.isReceivingCall = false)}>Dismiss</button>
          </div>
        </Container>
      }
    </div>

  );
}

const Container = styled(motion.div)`
  width: 20rem;
  padding-block: 1rem;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 50px;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  margin-inline: auto;
  margin-top: 1rem;
  .buttons {
    display: flex;
    column-gap: 10px;
    button {
      border: 0;
      outline: 0;
      background-color: transparent;
      font-weight: 400;
      font-weight:500;
      &.answer {
        color: deepskyblue;
      }
      &.reject {
        color: #ff2a53;
        /* &:hover {
          box-shadow: #ff2a53 0px 48px 100px 0px;
        } */
      }
    }
  }
`;

export default Notification;
