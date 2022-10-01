import React from "react";
import NoteContent from "./NoteContent";
import NoteArchiveButton from "./NoteArchiveButton";

function NoteItem({ title, body, createdAt, id, archived, onDelete, onArchive }) {
  return (
    <div className="note-item">
      <NoteContent title={title} body={body} date={createdAt} />
      <NoteArchiveButton id={id} archived={archived} onDelete={onDelete} onArchive={onArchive} />
    </div>
  );
}
export default NoteItem;
