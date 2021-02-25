import React from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { sidebarItems } from "../data/SidebarData";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";

function Sidebar({ rooms }) {
  const addChannel = () => {
    const promptName = prompt("Enter channel name");
    if (promptName) {
      db.collection("rooms").add({
        name: promptName,
      });
    }
  };

  return (
    <Container>
      <WorkspaceContainer>
        <Name>CleverProgrammer</Name>
        <NewMessage>
          <AddCircleOutlineIcon />
        </NewMessage>
      </WorkspaceContainer>
      <MainChannels>
        {sidebarItems.map((item, index) => (
          <MainChannelItem key={index}>
            {item.icon}
            {item.text}
          </MainChannelItem>
        ))}
      </MainChannels>
      <ChannelsContainer>
        <NewChannelContainer>
          <div>Channels</div>
          <AddIcon style={{ cursor: "pointer" }} onClick={addChannel} />
        </NewChannelContainer>
        <ChannelsList>
          {rooms.map((item) => (
            <Channel key={item.id}># {item.name}</Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background: ${(props) => props.theme.colors.sideBarBackground};
`;

const WorkspaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderBottom};
`;

const Name = styled.div``;

const NewMessage = styled.div`
  width: 36px;
  height: 36px;
  background: white;
  color: ${(props) => props.theme.colors.colorAndFill};
  fill: ${(props) => props.theme.colors.colorAndFill};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
`;

const MainChannels = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderBottom};
`;

const MainChannelItem = styled.div`
  color: ${(props) => props.theme.colors.sideBarText};
  display: grid;
  grid-template-columns: 15% auto;
  height: 28px;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;
  :hover {
    background: ${(props) => props.theme.colors.containerBackground};
  }
`;

const ChannelsContainer = styled.div`
  color: ${(props) => props.theme.colors.sideBarText};
  margin-top: 10px;
`;
const NewChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  padding-left: 19px;
  padding-right: 12px;
`;

const ChannelsList = styled.div``;
const Channel = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  padding-left: 19px;
  cursor: pointer;

  :hover {
    background: ${(props) => props.theme.colors.containerBackground};
  }
`;
