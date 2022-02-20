import { common, yellow, red, blue, orange } from "@mui/material/colors";

export const COLORS: Array<string> = [
  common["white"],
  common["black"],
  yellow["A400"],
  red["A400"],
  blue["A100"],
  orange["600"],
];

export interface NoteProps {
  noteId: string;
  title: string;
  content: string;
  color: number;
  dateUpdated: Date;
  onColorChange: (noteId: string, color: string) => void;
  onClick: (noteId: string) => void;
  onDelete: (noteId: string) => void;
}

export type AddNotesPayload = Pick<NoteProps, "color" | "content" | "title">;

export type UpdateNotesPayload = Partial<AddNotesPayload>;

export const DefaultNoteContent: AddNotesPayload = {
  title: "",
  content: "",
  color: 0,
};

export interface EditNoteProps {
  handleClose: () => void;
  handleSave: (note: AddNotesPayload, mode: "edit" | "add") => void;
  open: boolean;
  note?: AddNotesPayload | Notes;
}

export interface Notes {
  color: number;
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  user: string;
  _id: string;
}
