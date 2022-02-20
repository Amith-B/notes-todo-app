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
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  TextField,
  TextareaAutosize,
  Divider,
  LinearProgress,
  DialogTitle,
  DialogTitleProps,
  DialogContent,
  DialogActions,
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

const BootstrapDialogTitle = (
  props: DialogTitleProps & { onClose: () => void }
) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

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
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            sx={{
              background: COLORS[noteDetails.color],
              color: fontColor(noteDetails.color),
              "& .MuiButtonBase-root": {
                color: fontColor(noteDetails.color),
              },
            }}
          >
            {note ? "Edit Note" : "Create Note"}
          </BootstrapDialogTitle>

          {notesStatus === "loading" && <LinearProgress />}
          <DialogContent
            dividers
            sx={{
              padding: 0,
              maxHeight: "60vh",
              borderColor: fontColor(noteDetails.color),
            }}
          >
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
                onChange={(event) =>
                  updateDetails({ title: event.target.value })
                }
                sx={{
                  marginTop: 2,
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
                  marginBottom: "16px",
                }}
              />
            </Container>
          </DialogContent>
          <DialogActions
            sx={{
              background: COLORS[noteDetails.color],
              color: fontColor(noteDetails.color),
              "& .MuiButtonBase-root": {
                color: fontColor(noteDetails.color),
              },
            }}
          >
            <Button
              autoFocus
              color="inherit"
              onClick={() => handleSave(noteDetails, note ? "edit" : "add")}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
