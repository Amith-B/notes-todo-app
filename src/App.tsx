import TopBar from "./components/AppBar";
import NoteList from "./components/notes/NoteList";
import TodoList from "./components/todo/TodoList";
import Login from "./components/Login";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";

function App() {
  const loggedIn = false;

  const Authenticate = (component: JSX.Element) => {
    return loggedIn ? component : <Navigate replace to="/login" />;
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <TopBar />
      <Container
        maxWidth="xl"
        sx={{
          flexBasis: "auto",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate replace to="/notes" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="login"
            element={loggedIn ? <Navigate replace to="/notes" /> : <Login />}
          />
          <Route
            path="register"
            element={loggedIn ? <Navigate replace to="/notes" /> : <Register />}
          />
          <Route path="notes" element={Authenticate(<NoteList />)} />
          <Route path="todo" element={Authenticate(<TodoList />)} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
