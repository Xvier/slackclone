import React, { useState } from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { sidebarItems } from "../data/SidebarData";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function Sidebar({ rooms }) {
  const history = useHistory();

  const [channelId, setChannelId] = useState();

  const addChannel = () => {
    const promptName = prompt("Enter channel name");
    if (promptName) {
      db.collection("rooms").add({
        name: promptName,
      });
    }
  };

  const goToChannel = (id) => {
    if (id) {
      history.push(`/room/${id}`);
      updateChannelList();
    }
  };

  const deleteChannel = (id) => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .delete()
        .then(() => {
          alert("Room is Deleted");
          history.push(`/room`);
        })
        .catch((error) => {
          console.error("Cannot find document: ", error);
        });
    }
  };

  const updateChannelList = () => {
    setChannelId(window.location.pathname.split("/")[2]);
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
            <Channel onClick={() => goToChannel(item.id)} key={item.id}>
              <div># {item.name} </div>
              {item.id === channelId ? (
                <DeleteIcon onClick={() => deleteChannel(item.id)} />
              ) : (
                ""
              )}
            </Channel>
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
  justify-content: space-between;
  padding-right: 30px;
  :hover {
    background: ${(props) => props.theme.colors.containerBackground};
  }
`;

const DeleteIcon = styled(DeleteOutlineIcon)`
  :hover {
    color: gray;
  }
`;
