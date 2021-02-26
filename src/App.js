import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { normalTheme } from "./themes/purple";
import { darkTheme } from "./themes/dark";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";

function App() {
  const stored = localStorage.getItem("isDarkMode");
  const [isDarkMode, setIsDarkMode] = useState(
    stored === "true" ? true : false
  );

  const [rooms, setRooms] = useState([]);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function handleClick() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  }

  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, name: doc.data().name };
        })
      );
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={isDarkMode ? darkTheme : normalTheme}>
        <Router>
          {!user ? (
            <Login setUser={setUser} />
          ) : (
            <Container>
              <Header signOut={signOut} user={user} runClick={handleClick} />
              <Main>
                <Sidebar rooms={rooms} />
                <Switch>
                  <Route path="/room/:channelId">
                    <Chat user={user} />
                  </Route>
                  <Route path="/">
                    <HomeContainer>Select or Create Channel</HomeContainer>
                  </Route>
                </Switch>
              </Main>
            </Container>
          )}
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 50px;
  background-image: ${(props) => props.theme.colors.chatBackgroundImage};
`;
