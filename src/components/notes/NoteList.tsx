import "./NoteList.css";
import Note from "./Note";

function NoteList() {
  const noteList = Array.from(Array(10).keys());
  return (
    <>
      {noteList.map((note) => {
        return <Note />;
      })}
    </>
  );
}

export default NoteList;
