import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";

function Chat({ user }) {
  let { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [messages, setMessages] = useState();

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const getChannel = () => {
    db.collection("rooms")
      .doc(channelId)
      .onSnapshot((snapshot) => {
        setChannel(snapshot.data());
      });
  };

  const sendMessage = (text) => {
    if (channelId) {
      let payload = {
        text: text,
        timestamp: firebase.firestore.Timestamp.now(),
        user: user.name,
        userImage: user.photo,
      };
      db.collection("rooms").doc(channelId).collection("messages").add(payload);
    }
  };

  const getMessages = () => {
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let datas = snapshot.docs.map((doc) => doc.data());
        setMessages(datas);
      });
  };

  useEffect(() => {
    getChannel();
    getMessages();
    // eslint-disable-next-line
  }, [channelId]);
  return (
    <Container>
      <ChatHeader>
        <Main>
          <Text>
            # {channel && channel.name} <StarBorderIcon />
          </Text>
          <RightSide>
            Details
            <Icon>
              <InfoOutlinedIcon />{" "}
            </Icon>
          </RightSide>
        </Main>
        <SubText>This is the room where all things matter</SubText>
      </ChatHeader>
      <MessageContainer>
        {messages &&
          messages.length > 0 &&
          messages.map((data, index) => (
            <ChatMessage
              text={data.text}
              name={data.user}
              image={data.userImage}
              timestamp={data.timestamp}
              key={index}
            />
          ))}
        <span ref={dummy}></span>
      </MessageContainer>
      <ChatInput sendMessage={sendMessage}></ChatInput>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  background: ${(props) => props.theme.colors.chatBackground};
  color: ${(props) => props.theme.colors.chatText};
  display: grid;
  grid-template-rows: 64px auto min-content;
  background-image: ${(props) => props.theme.colors.chatBackgroundImage};
  min-height: 0;
`;

const ChatHeader = styled.div`
  display: grid;
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
`;

const Main = styled.div`
  padding-top: 10px;
  padding-bottom: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 19px;
`;
const RightSide = styled.div`
  display: flex;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  padding-left: 10px;
  cursor: pointer;
`;

const SubText = styled.div`
  padding-left: 19px;
  color: gray;
  font-size: 14px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
