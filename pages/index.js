
import { FaVideo } from "react-icons/fa";
import { MdCallEnd, MdAddCall, MdVideoCall } from "react-icons/md";
import { BsGearWideConnected } from "react-icons/bs";
import styled from "styled-components";
import { useRef, useState, useContext } from "react";
import { SnackbarProvider, } from "notistack";
import Settings from "../components/Settings";
import MakeCall from "../components/MakeCall";
import { SocketContext } from "../components/SocketContext";
import Notification from "../components/Notification";

export default function Home() {
  const {
    myVideo,
    stream,
    me,
    call,
    name,
    userVideo,
    callAccepted,
    callEnded,
    leaveCall,
  } = useContext(SocketContext);

  const [showSettings, setShowSettings] = useState(false);
  const [userNameSet, setUserNameSet] = useState(false);
  const [userName, setUserName] = useState(null);

  const [showMakeCall, setShowMakeCall] = useState(false);
  const handleInputValue = (value) => {
    setUserName(value);
  };

  return (
    <MainContainer>
      <SnackbarProvider />
      <Notification />
      <Header>
        <div className="logo--container">
          <div className="logo">
            <FaVideo />
          </div>
          <h1>StreamMate</h1>
        </div>
        <nav>
          <div
            className="icon--container"
            onClick={() => {
              if (showSettings) {
                setShowSettings((prev) => !prev);
                setShowMakeCall((prev) => !prev);
              } else {
                setShowMakeCall((prev) => !prev);
              }
            }}
          >
            <MdAddCall />
          </div>
          <div
            className="icon--container"
            onClick={() => {
              if (showMakeCall) {
                setShowMakeCall((prev) => !prev);
                setShowSettings((prev) => !prev);
              } else {
                setShowSettings((prev) => !prev);
              }
            }}
          >
            <BsGearWideConnected />
          </div>
        </nav>
      </Header>

      <div className="section--container">
        <VideoScreen>
          <ConnectedUsers>
            <div className="user">
              <video ref={myVideo} autoPlay playsInline></video>
              <div className="tag">{name || "Username not set"}</div>
            </div>
          </ConnectedUsers>
          {callAccepted && !callEnded && (
            <video
              ref={userVideo}
              width="100%"
              height="100%"
              playsInline
              muted
              autoPlay
            ></video>
          )}
          {!callAccepted && <div className="skeleton">No connected mate! </div>}
          <div className="cli--tag">{call.name}</div>
          <div className="btn--container">
            {callAccepted && (
              <button onClick={() => leaveCall()}>
                <MdCallEnd />
              </button>
            )}
            {!callAccepted && (
              <button
                style={{
                  backgroundColor: "deepskyblue",
                }}
                onClick={() => setShowMakeCall((prev) => !prev)}
              >
                <MdVideoCall />
              </button>
            )}
          </div>
        </VideoScreen>
        <SettingsContainer>
          {showSettings && (
            <Settings
              userName={userName}
              userNameSet={userNameSet}
              showSettings={showSettings}
              handleInputValue={handleInputValue}
              setUserNameSet={setUserNameSet}
            />
          )}
          {showMakeCall && (
            <MakeCall
              showMakeCall={showMakeCall}
              setShowMakeCall={setShowMakeCall}
            />
          )}
        </SettingsContainer>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  padding-inline: 1.25rem;
  @media screen and (max-width: 1023px) {
    padding-inline: 0.5rem;
  }
  .section--container {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    justify-content: space-between;
    @media screen and (max-width: 1023px) {
      flex-direction: column;
    }
  }
`;

const Header = styled.header`
  width: 100%;
  height: 10%;
  padding: 2rem;
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1023px) {
    padding-right: 0px;
    padding-bottom:1rem;
    padding-top: 0.1rem;
    height: 8%;
  }
  .logo--container {
    display: flex;
    align-items: center;
    .logo {
      background-color: #141e30;
      padding: 0.65rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      svg {
        font-size: 1.263rem;
        color: white;
      }
    }
    h1 {
      padding-left: 0.8rem;
      font-size: 1.2rem;
      color: #141e30;
      letter-spacing: -1px;
    }
  }
  nav {
    display: flex;
    column-gap: 10px;
    .icon--container {
      padding: 0.65rem;
      padding-inline: 1rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #141e30;
      cursor: pointer;
      svg {
        color: whitesmoke;
        font-size: 1.2rem;
      }
    }
  }
`;
const ConnectedUsers = styled.section`
  /* width: 20%; */
  height: 100%;
  padding-block: 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  position: absolute;
  right: 0;
  @media screen and (max-width: 1023px) {
    justify-content: flex-start;
    margin-right: 0.5rem;
    padding-top: 0.5rem;
  }
  .user {
    width: 10rem;
    height: 10rem;
    background-color: whitesmoke;
    border-radius: 10px;
    position: relative;
    @media screen and (max-width: 1023px){
      height: 12rem;
    }
    .tag {
      padding: 0.2rem 0.6rem;
      background-color: transparent;
      color: white;
      position: absolute;
      bottom: 0;
      margin-bottom: 0.4rem;
      margin-left: 0.4rem;
      border-radius: 10px;
      font-size: 0.8rem;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
`;

const VideoScreen = styled.section`
  width: 75%;
  height: 85%;
  background-color: #ccc;
  border-radius: 10px;
  position: relative;
  margin-top: 1rem;
  @media screen and (max-width: 1023px) {
    width: 100%;
    margin-top: 0.5rem;
  }
  video {
    object-fit: cover;
    border-radius: inherit;
  }
  .skeleton {
    width: 100%;
    height: 100%;
    background-color: black;
    color: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
  }
  .cli--tag {
    padding: 0.4rem 0.8rem;
    background-color: #00000085;
    color: white;
    position: absolute;
    top: 0;
    margin-top: 0.625rem;
    margin-left: 1rem;
    border-radius: 10px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn--container {
    width: 100%;
    bottom: 0;
    position: absolute;
    display: flex;
    justify-content: center;

    button {
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
      width: 5rem;
      height: 3rem;
      background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: 0;
      border: 0;
      border-radius: 10px;
      margin-bottom: 0.625rem;
      svg {
        color: white;
        font-size: 2rem;
      }
    }
  }
`;

const SettingsContainer = styled.aside`
  width: 25%;
  height: 90%;
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  @media screen and (max-width: 1023px) {
    position: absolute;
    width: 100%;
    padding-inline: 0;
  }
`;
