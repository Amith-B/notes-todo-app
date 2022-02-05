import "./NoteList.css";
import Note from "./Note";

function NoteList() {
  const noteList = Array.from(Array(40).keys());
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        placeContent: "center space-around",
      }}
    >
      {noteList.map((note, index) => {
        return (
          <Note
            key={`${index}`}
            heading="Heading"
            noteId={`${note}`}
            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, dicta nostrum quaerat rem labore excepturi necessitatibus tempora. Officiis maxime deserunt explicabo minus praesentium placeat nulla. Amet dolore in nulla nesciunt!"
            color={`${note % 6}`}
            dateCreated={new Date()}
            onColorChange={(color: string) => console.log(color)}
            onClick={(noteId: string) => console.log(note)}
          />
        );
      })}
    </div>
  );
}

export default NoteList;
