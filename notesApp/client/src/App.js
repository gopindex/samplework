import React from "react";
import Header from "./components/Header";
import NoteBoard from "./components/NoteBoard";
import "./App.css";
import { NotesProvider } from "./context/NotesContext";
export default function App() {
  return (
    <div className="container">
      <Header />
      <NotesProvider>
        <NoteBoard />
      </NotesProvider>
    </div>
  );
}
