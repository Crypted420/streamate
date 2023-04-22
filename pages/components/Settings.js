import { motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "./SocketContext";
import CopyToClipboard from "react-copy-to-clipboard";

function Settings({
  showSettings,
  userName,
  userNameSet,
  setUserNameSet,
  handleInputValue,
}) {
  const { me, setName } = useContext(SocketContext);

  const settingsVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100px" },
  };

  const handleChange = (e) => {
    handleInputValue(e.target.value);
  };
  return (
    <>
      <SettingsBox
        initial={{ opacity: 0, y: "-100px" }}
        animate={showSettings ? "open" : "closed"}
        variants={settingsVariants}
      >
        <h1>Settings</h1>
        <input
          type="text"
          placeholder="Create Username"
          onChange={handleChange}
        />

        <button
          onClick={() => {
            if (userName != null) {
              if (userName.length >= 3) {
                enqueueSnackbar("Username created!", {
                  variant: "success",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
                setUserNameSet(true);
                setName(userName);
              } else {
                enqueueSnackbar("Username too short!", {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
              }
            } else {
              enqueueSnackbar("Username cannot be empty", {
                variant: "error",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              });
            }
          }}
        >
          Create
        </button>

        <input type="text" value={me} className="callerid" disabled />

        <CopyToClipboard text={me}>
          <button
            onClick={() =>
              enqueueSnackbar("Copied", {
                variant: "success",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              })
            }
          >
            Copy CallerID
          </button>
        </CopyToClipboard>
      </SettingsBox>
    </>
  );
}

const SettingsBox = styled(motion.div)`
  padding-inline: 1rem;
  padding-block: 1rem;
  border-radius: 10px;
  width: 100%;
  height: 20rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  @media screen and (max-width: 1023px) {
    background: white;
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
    &.callerid {
      margin-top: 1rem;
    }
  }
  button {
    padding-inline: 2rem;
    height: 2.5rem;
    margin-top: 1rem;
    background-color: #141e30;
    color: white;
    outline: none;
    border: 0;
    border-radius: 10px;
    transition: all 0.2s ease-in;
    &:active {
      opacity: 0.4;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    }
  }
`;

export default Settings;
