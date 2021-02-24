import React from "react";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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
    </Container>
  );
}

export default Chat;

const Container = styled.div``;

const ChatHeader = styled.div`
  height: 80px;
  display: grid;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const Main = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
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
