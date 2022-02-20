import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import {
  AddNotesPayload,
  COLORS,
  DefaultNoteContent,
  EditNoteProps,
  Notes,
} from "../../models/Note";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  TextField,
  TextareaAutosize,
  Divider,
  LinearProgress,
} from "@mui/material";
import { fontColor } from "../../helpers";
import { selectNotesStatus } from "../../store/reducers/notesSlice";
import { useAppSelector } from "../../store/hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditNote({
  handleClose,
  handleSave,
  open,
  note,
}: EditNoteProps) {
  const [noteDetails, setNoteDetails] = React.useState<AddNotesPayload | Notes>(
    note || { ...DefaultNoteContent }
  );

  const notesStatus = useAppSelector(selectNotesStatus);

  React.useEffect(() => {
    if (note) {
      setNoteDetails(note);
    } else {
      setNoteDetails(DefaultNoteContent);
    }
  }, [note, open]);

  const updateDetails = (currentData: Partial<AddNotesPayload>) => {
    setNoteDetails((prevData) => ({
      ...prevData,
      ...currentData,
    }));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {note ? "Edit Note" : "Create Note"}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => handleSave(noteDetails, note ? "edit" : "add")}
              >
                Save
              </Button>
            </Toolbar>
          </AppBar>
          {notesStatus === "loading" && <LinearProgress />}
          <Container
            maxWidth="xl"
            sx={{
              flexBasis: "auto",
              height: "100%",
              overflow: "auto",
              background: COLORS[noteDetails.color],
              "& .MuiInputBase-root, & .MuiInputLabel-root": {
                color: fontColor(noteDetails.color),
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset, &:hover fieldset, &.Mui-focused fieldset": {
                  borderColor: fontColor(noteDetails.color),
                },
              },
            }}
          >
            <TextField
              fullWidth
              label="Title"
              id="title"
              value={noteDetails.title}
              onChange={(event) => updateDetails({ title: event.target.value })}
              sx={{
                marginTop: 4,
              }}
            />
            <Divider
              sx={{
                marginTop: 2,
                marginBottom: 2,
                "&.MuiDivider-root": {
                  borderTop: `1px solid ${fontColor(noteDetails.color)}`,
                },
              }}
            ></Divider>
            <TextareaAutosize
              minRows={4}
              aria-label="notes content"
              placeholder="Enter your content here"
              value={noteDetails.content}
              onChange={(event) =>
                updateDetails({ content: event.target.value })
              }
              style={{
                width: "100%",
                height: "calc(100% - 150px)",
                background: COLORS[noteDetails.color],
                color: fontColor(noteDetails.color),
                border: `1px solid ${fontColor(noteDetails.color)}`,
                borderRadius: "4px",
                padding: "14px",
                fontSize: "1rem",
              }}
            />
          </Container>
        </Box>
      </Dialog>
    </div>
  );
}
