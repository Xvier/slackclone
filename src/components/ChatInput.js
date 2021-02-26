import React, { useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import LinkIcon from "@material-ui/icons/Link";
import CodeIcon from "@material-ui/icons/Code";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

function ChatInput({ sendMessage }) {
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!input) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <Container>
      <InputContainer>
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
            placeholder="Message here..."
          />
          <SendButton type="submit" onClick={send}>
            <Send />
          </SendButton>
        </form>
        <IconListContainer>
          <IconList>
            <Bold />
            <Italic />
            <Link />
            <Code />
          </IconList>
          <IconList>
            <Smiley />
            <Email />
          </IconList>
        </IconListContainer>
      </InputContainer>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 24px;
`;

const InputContainer = styled.div`
  border: 1px solid #8d8d8e;
  border-radius: 4px;

  form {
    display: flex;
    height: 42px;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid grey;
    /* justify-content: space-between; */
    input {
      flex: 1;
      border: none;
      font-size: 13px;
      background: transparent;
      :focus {
        outline: none;
      }
    }
  }
`;

const SendButton = styled.button`
  background: transparent;
  border-radius: 2px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border: none;
  cursor: pointer;

  :hover {
    background: #148567;
  }

  .MuiSvgIcon-root {
    width: 18px;
  }
`;

const IconListContainer = styled.div`
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
`;

const IconList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Send = styled(SendIcon)`
  color: black;
`;

const Bold = styled(FormatBoldIcon)`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    color: gray;
  }
`;
const Italic = styled(FormatItalicIcon)`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    color: gray;
  }
`;
const Link = styled(LinkIcon)`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    color: gray;
  }
`;
const Code = styled(CodeIcon)`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    color: gray;
  }
`;

const Smiley = styled(SentimentSatisfiedIcon)`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    color: gray;
  }
`;

const Email = styled(AlternateEmailIcon)`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    color: gray;
  }
`;
