// import * as NOTES from "./types"
import {
  ADD_NOTE,
  ADD_NOTE_CARD,
  UPDATE_NOTE,
  UPDATE_NOTE_CARD,
  DELETE_NOTE,
  DELETE_NOTE_CARD,
  NOTES_LOADED,
} from "./types";
const initialState = {
  notes: [],
  note: {},
  loading: true,
};
function NotesReducer(state, action) {
  switch (action.type) {
    case NOTES_LOADED:
      return { ...state, notes: action.payload, loading: false };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
        loading: false,
      };
    case ADD_NOTE_CARD: {
      // [{noteCards},{noteCards:},{noteCards:}]
      let idx = state.notes.findIndex((el) => el._id === action.payload._id);
      let allNotes = [...state.notes];
      allNotes[idx] = action.payload;
      return { notes: allNotes, loading: false };
    }
    case DELETE_NOTE_CARD: {
      let idx = state.notes.findIndex((el) => el._id === action.payload.noteId);
      let allNotes = [...state.notes];
      let note = allNotes[idx];
      note.noteCards = note.noteCards.filter(
        (el) => el._id !== action.payload.noteCardId
      );
      return { ...state, notes: allNotes, loading: false };
    }

    case DELETE_NOTE: {
      let allNotes = state.notes.filter((el) => el._id !== action.payload.id);
      return { ...state, notes: allNotes };
    }
    default:
      return state;
  }
}

export { NotesReducer, initialState };
