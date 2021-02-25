import React from "react";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

function Chat() {
  return (
    <Container>
      <ChatHeader>
        <Main>
          <Text>
            # superRoom <StarBorderIcon />
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
        <ChatMessage />
      </MessageContainer>
      <ChatInput></ChatInput>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  background: ${(props) => props.theme.colors.defaultColor};
  color: ${(props) => props.theme.colors.chatText};
  display: grid;
  grid-template-rows: 64px auto min-content;
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

const MessageContainer = styled.div``;
