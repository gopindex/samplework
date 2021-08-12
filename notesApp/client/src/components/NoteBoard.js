import React, { useState, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import "./styles/NoteBoard.css";
import NoteCard from "./NoteCard";
import axios from "../utils/axios";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";

export default function NoteBoard() {
  const { state, dispatch } = useContext(NotesContext);

  const [toggleForm, setToggleForm] = useState(false);
  const [noteTopic, setNoteTopic] = useState("");

  const addNoteTopic = async (ev) => {
    try {
      ev.preventDefault();
      const topic = await axios.post("/api/notes", { title: noteTopic });
      dispatch({ type: "ADD_NOTE", payload: topic.data });
      setNoteTopic("");
      setToggleForm(false);
    } catch {
      console.log("Err");
    }
  };

  const renderForm = () => {
    return (
      <div>
        <form className="toggleForm" onSubmit={addNoteTopic}>
          <textarea
            onChange={(ev) => setNoteTopic(ev.target.value)}
            value={noteTopic}
            rows={3}
            placeholder="Add a new topic...."
          ></textarea>
          <div className="toggleControls">
            <div>
              <button type="submit" class="btn bluebtn">
                Add Topic
              </button>
            </div>
            <div onClick={() => setToggleForm(false)} className="toggleIcon">
              <AiFillCloseCircle className="icon" />
            </div>
          </div>
        </form>
      </div>
    );
  };
  return (
    <div className="notesBg">
      <div className="notesContainer">
        {state.notes?.map((note) => {
          return <NoteCard key={note._id} note={note} />;
        })}
        {/* <NoteCard />
        <NoteCard /> */}

        {toggleForm ? (
          renderForm()
        ) : (
          <div class="addTopic" onClick={() => setToggleForm(true)}>
            <AiOutlinePlus />
            <h5>Add Note topic</h5>
          </div>
        )}
      </div>
    </div>
  );
}
