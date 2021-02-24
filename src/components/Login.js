import React from "react";
import styled from "styled-components";

function Login() {
  return <Container>Login page</Container>;
}

export default Login;

const Container = styled.div`
  background: ${(props) => props.theme.colors.defaultColor};
  color: ${(props) => props.theme.colors.chatText};
`;
