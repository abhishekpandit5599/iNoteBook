import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteSate = (props) => {  

  // const host = "http://localhost:5000";

  const host = "https://inotebook-backend-5599.herokuapp.com";
  const [notes, setNotes] = useState([]);


  // Fetch all Notes
  const getNote = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      };
      const response = await fetch(
        `${host}/api/notes/fetchallnotes`,
        requestOptions
      );
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call for Add Note
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ title, description, tag }),
      };
      const response = await fetch(`${host}/api/notes/addnote`, requestOptions);
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      // API Call for Delete Note
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      };
      await fetch(`${host}/api/notes/deletenote/${id}`, requestOptions);

      const newNotes = notes.filter((note) => {
        return id !== note._id;
      });
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      // API fetch for edit Note
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ title, description, tag }),
      };
      await fetch(`${host}/api/notes/updatenote/${id}`, requestOptions);
      getNote();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteSate;
