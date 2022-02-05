import TopBar from "./components/AppBar";
import NoteList from "./components/notes/NoteList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function App() {
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
        <NoteList />
      </Container>
    </Box>
  );
}

export default App;
