import { createContext, useReducer, useEffect } from "react";
import { NotesReducer, initialState } from "../reducer/NotesReducer";
import axios from "../utils/axios";
const NotesContext = createContext(null);
const NotesProvider = (props) => {
  const [state, dispatch] = useReducer(NotesReducer, initialState);

  useEffect(() => {
    getAllNotes();
  }, [dispatch]);
  const getAllNotes = async () => {
    try {
      const { data } = await axios.get("/api/notes");
      dispatch({ type: "NOTES_LOADED", payload: data });
    } catch (err) {
      console.log("Err");
    }
  };

  return (
    <NotesContext.Provider value={{ state, dispatch, getAllNotes }}>
      {props.children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
