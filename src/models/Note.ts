import { common, yellow, red, blue, orange } from "@mui/material/colors";

export const COLORS: Record<string, string> = {
  "0": common["white"],
  "1": common["black"],
  "2": yellow["A400"],
  "3": red["A400"],
  "4": blue["A100"],
  "5": orange["600"],
};

export interface NoteInput {
  noteId: string;
  heading: string;
  content: string;
  color: string;
  dateCreated: Date;
  onColorChange: (color: string) => void;
  onClick: (noteId: string) => void;
}
