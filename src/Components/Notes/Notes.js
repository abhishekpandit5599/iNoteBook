import React, { useState,useContext, useEffect } from "react";
import "./Notes.css";
import NotesItem from "../NotesItem/NotesItem";
import NoteContext from "../../Context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  let navigate = useNavigate();

  const context = useContext(NoteContext);
  const { notes, getNote,editNote } = context;
  const [note,setNote] = useState({etitle:'',edescription:'',etag:'',_id:''})


  
  useEffect(() => {
    if(localStorage.getItem("auth-token")){
      getNote();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // setState of inputs
  const onChange = (e) => {
    setNote({...note,[e.target.name]: e.target.value})
  };

  // handle of add note button
  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note._id,note.etitle,note.edescription,note.etag);
    handleBlur();
  }

  // Remove blur Background
  const handleBlur=()=>{
    let blur = document.getElementsByClassName('blur');
    document.getElementById('pop-up').style.display='none';
    Array.from(blur).forEach((e)=>{
      e.style.filter = 'blur(0px)'
    })
  }

  // Update note function
  const updateNote = (currentNote) =>{
    let pop_up = document.getElementById('pop-up');
    let blur = document.getElementsByClassName('blur');

    if(pop_up.style.display === 'none'){
      pop_up.style.display = 'block';
      Array.from(blur).forEach((e)=>{
        e.style.filter = 'blur(5px)'
      })
    }
    else{
      handleBlur();
    }
    setNote({etitle: currentNote.title,edescription: currentNote.description,etag:currentNote.tag,_id: currentNote._id})
  }

  // Handle Cross of pop up input
  const handleCrossBtn = () =>{
    handleBlur();
  }

  return (
    <>
      <div className="blur notes-container">
        <div className="note-heading">
          <h2>----- Your Note -----</h2>
        </div>
        {notes.map((note) => {
          return <NotesItem key={note._id} note={note} updateNote={updateNote}/>;
        })}
      </div>

      <div id='pop-up' className="pop-up">
        <div className="modal-note-input-div">
          <div className="modal-heading">
            <h2>Edit Note <i onClick={handleCrossBtn} className="placeicon cross-icon far fa-times-circle"></i></h2>
          </div>
          <form className="modal-form-container">
            <div className="title-div">
              <label htmlFor="etitle">
                <h3>Title</h3>
              </label>
              <input
                name="etitle"
                value={note.etitle}
                onChange={onChange}
                type="text"
                id="etitle"
                placeholder="Title"
              />
            </div>

            <div className="tag-div">
              <label htmlFor="etag">
                <h3>Tag</h3>
              </label>
              <input
                name="etag"
                value={note.etag}
                onChange={onChange}
                type="text"
                id="etag"
                placeholder="Tag"
              />
            </div>

            <div className="description-div">
              <label htmlFor="edescription">
                <h3>Note</h3>
              </label>
              <textarea
                name="edescription"
                value={note.edescription}
                onChange={onChange}
                rows="6"
                type="text"
                id="edescription"
                placeholder="Note message"
              />
            </div>

            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="add-note-btn">Edit Note</button>
          </form>
        </div>  
      </div>
    </>
  );
}
