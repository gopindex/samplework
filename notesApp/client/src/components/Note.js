import React, { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { AiOutlineEdit, AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import axios from "../utils/axios";
export default function Note(props) {
  const { state, dispatch, getAllNotes } = useContext(NotesContext);
  const [editValues, setEditValues] = useState(props.eachNote.note);
  const [toggleForm, setToggleForm] = useState(false);

  const editNoteCard = async (ev) => {
    try {
      ev.preventDefault();
      const { data } = await axios.put(
        `/api/notes/card/${props.eachNote._id}`,
        {
          note: editValues,
        }
      );
      // alternative
      await getAllNotes();

      setToggleForm(false);
      // dispatch({ type: "ADD_NOTE_CARD", payload: topic.data });
      setEditValues("");
    } catch (err) {
      console.log("Err");
    }
  };
  const deleteNoteCard = async (ev) => {
    try {
      ev.preventDefault();
      await axios.delete(`/api/notes/card/${props.eachNote._id}`);
      dispatch({
        type: "DELETE_NOTE_CARD",
        payload: {
          noteId: props.noteId,
          noteCardId: props.eachNote._id,
        },
      });
      // getAllNotes();

      setEditValues("");
      setToggleForm(false);
    } catch (err) {
      console.log("Err");
    }
  };
  const renderForm = () => {
    return (
      <div>
        <form className="toggleForm" onSubmit={editNoteCard}>
          <textarea
            value={editValues}
            rows={3}
            onChange={(ev) => setEditValues(ev.target.value)}
            placeholder="Add a new topic...."
          ></textarea>
          <div className="toggleControls">
            <div>
              <button type="submit" class="btn bluebtn">
                Save
              </button>
            </div>
            <div onClick={() => setToggleForm(false)} className="toggleIcon">
              <AiFillCloseCircle
                className="icon"
                style={{ color: "#026aa7" }}
              />
            </div>
            <div onClick={deleteNoteCard} className="toggleIcon">
              <AiFillDelete className="icon" style={{ color: "red" }} />
            </div>
          </div>
        </form>
      </div>
    );
  };

  if (toggleForm) {
    return renderForm();
  }
  return (
    <div className="note">
      <div>{props.eachNote.note}</div>

      <div onClick={() => setToggleForm(true)}>
        <AiOutlineEdit />
      </div>
    </div>
  );
}
