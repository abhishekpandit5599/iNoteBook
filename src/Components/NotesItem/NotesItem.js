import React,{useContext} from 'react';
import './NotesItem.css';
import NoteContext from '../../Context/notes/NoteContext';

export default function NotesItem(props) {
    const {note,updateNote} = props;

    const context = useContext(NoteContext);
    const {deleteNote} = context;

  return(
      <>
        <div className='notesitem-container'>
            <div className='title'><h3>{note.title}</h3>  <i onClick={()=>{deleteNote(note._id)}} className="placeicon icon fas fa-trash"></i>  <i onClick={()=>{updateNote(note)}} className="placeicon icon fas fa-edit"></i></div>
            <div className='description'>{note.description}</div>
            <div className='tag'>{note.tag}</div>
        </div>
      </>
  );
}
