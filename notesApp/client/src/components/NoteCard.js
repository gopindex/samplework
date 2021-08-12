import React, { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import Note from "./Note";
import "./styles/NoteCard.css";
import { AiOutlinePlus, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import axios from "../utils/axios";
export default function NoteCard(props) {
  const { state, dispatch, getAllNotes } = useContext(NotesContext);
  const [noteCard, setNoteCard] = useState("");
  const [toggleForm, setToggleForm] = useState(false);

  const deleteEntireNote = async () => {
    try {
      await axios.delete(`/api/notes/${props.note._id}`);
      getAllNotes();
    } catch (err) {
      console.log("Err");
    }
  };
  const addNoteCard = async (ev) => {
    try {
      ev.preventDefault();
      const topic = await axios.post(`/api/notes/${props.note._id}`, {
        note: noteCard,
      });
      dispatch({ type: "ADD_NOTE_CARD", payload: topic.data });
      setNoteCard("");
    } catch (err) {
      console.log("Err");
    }
  };
  const renderForm = () => {
    return (
      <div>
        <form className="toggleForm" onSubmit={addNoteCard}>
          <textarea
            value={noteCard}
            rows={3}
            onChange={(ev) => setNoteCard(ev.target.value)}
            placeholder="Add a new topic...."
          ></textarea>
          <div className="toggleControls">
            <div>
              <button type="submit" class="btn bluebtn">
                Add Notes
              </button>
            </div>
            <div onClick={() => setToggleForm(false)} className="toggleIcon">
              <AiFillCloseCircle
                className="icon"
                style={{ color: "#026aa7" }}
              />
            </div>
          </div>
        </form>
      </div>
    );
  };
  return (
    <div className="noteCard">
      <div className="note_title">
        <div>
          <h3>{props?.note.title}</h3>
        </div>
        <div
          style={{ fontSize: 18, cursor: "pointer" }}
          onClick={deleteEntireNote}
        >
          <AiFillDelete />
        </div>
      </div>
      <div className="note_cards">
        {props.note.noteCards?.map((noteCard) => {
          return (
            <Note
              eachNote={noteCard}
              key={noteCard._id}
              noteId={props.note._id}
            />
          );
        })}
      </div>
      {toggleForm ? (
        renderForm()
      ) : (
        <div class="note_add" onClick={() => setToggleForm(true)}>
          <AiOutlinePlus />
          Add new Note
        </div>
      )}
    </div>
  );
}
