import { common, yellow, red, blue, orange } from "@mui/material/colors";

export const COLORS: Array<string> = [
  common["white"],
  common["black"],
  yellow["A400"],
  red["A400"],
  blue["A100"],
  orange["600"],
];

export interface NoteInput {
  noteId: string;
  title: string;
  content: string;
  color: number;
  dateUpdated: Date;
  onColorChange: (noteId: string, color: string) => void;
  onClick: (noteId: string) => void;
  onDelete: (noteId: string) => void;
}

export type AddNotesPayload = Pick<NoteInput, "color" | "content" | "title">;

export type UpdateNotesPayload = Partial<AddNotesPayload>;
