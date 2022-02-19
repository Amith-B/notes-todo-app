import TopBar from "./components/AppBar";
import NoteList from "./components/notes/NoteList";
import TodoList from "./components/todo/TodoList";
import Login from "./components/Login";
import { Box, Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import { useAppSelector } from "./store/hooks";
import { selectIsLoggedIn } from "./store/reducers/authSlice";
import Alert from "./components/Alert";

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const Authenticate = (component: JSX.Element) => {
    return isLoggedIn ? component : <Navigate replace to="/login" />;
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
              isLoggedIn ? (
                <Navigate replace to="/notes" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="login"
            element={isLoggedIn ? <Navigate replace to="/notes" /> : <Login />}
          />
          <Route
            path="register"
            element={
              isLoggedIn ? <Navigate replace to="/notes" /> : <Register />
            }
          />
          <Route path="notes" element={Authenticate(<NoteList />)} />
          <Route path="todo" element={Authenticate(<TodoList />)} />
        </Routes>
      </Container>
      <Alert />
    </Box>
  );
}

export default App;
