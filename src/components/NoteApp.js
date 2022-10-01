import React from "react";
import { getInitialData } from "../utils/index";
import NoteHeader from "./NoteHeader";
import NoteInput from "./NoteInput";
import NoteItemList from "./NoteItemList";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: "",
    };
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveEventHandler = this.onArchiveEventHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onNoteSearchHandler = this.onAddNoteHandler.bind(this);
  }
  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }
  onArchiveEventHandler(id) {
    const notes = this.state.notes.map((note) => (note.id === id ? { ...note, archived: !note.archived } : note));
    this.setState({ notes });
  }
  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString,
            archived: false,
          },
        ],
      };
    });
  }
  onNoteSearchHandler(event) {
    this.setState(() => {
      return {
        search: event.target.value,
      };
    });
  }
  render() {
    const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.search.toLowerCase()));
    const notActive = notes.filter((note) => {
      return note.archived === false;
    });
    const active = notes.filter((note) => {
      return note.archived === true;
    });
    return (
      <div>
        <NoteHeader search={this.state.search} onSearchChange={this.onNoteSearchHandler} />
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>catatan Aktif</h2>
          {notActive.length > 0 ? <NoteItemList keyword={this.state.keyword} notes={notActive} onDelete={this.onDeleteHandler} onArchive={this.onArchiveEventHandler} /> : <p className="notes-list__empty-message">Tidak Ada catatan</p>}
          <h2>Arsip</h2>
          {active.length > 0 ? <NoteItemList keyword={this.state.keyword} notes={active} onDelete={this.onDeleteHandler} onArchive={this.onArchiveEventHandler} /> : <p className="notes-list__empty-message">Tidak Ada catatan</p>}
        </div>
      </div>
    );
  }
}
export default NoteApp;
