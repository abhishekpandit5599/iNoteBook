import React,{ useContext, useState} from 'react';
import Notes from '../Notes/Notes';
import './Home.css';
import NoteContext from '../../Context/notes/NoteContext';

export default function Home() {

  const context = useContext(NoteContext);
  const {addNote} = context;

  
  const [note,setNote] = useState({title:'',description:'',tag:''})

  
  

  // setState of inputs
  const onChange=(e)=>{
    setNote({...note,[e.target.name]: e.target.value})
  }

  // handle of add note button
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:'',description:'',tag:''})
  }
  

  return (
      <div className='home-container'>
          <div className='blur note-input-div'>
              <form>
                  <div className='title-div'>
                    <label htmlFor='title'><h3>Title</h3></label>
                    <input value={note.title} name='title' onChange={onChange} type='text' id="title" placeholder='Title'/>
                  </div>

                  <div className='tag-div'>
                    <label htmlFor='tag'><h3>Tag</h3></label>
                    <input value={note.tag} name='tag' onChange={onChange} type='text' id="tag" placeholder='Tag'/>
                  </div>
                
                  <div className='description-div'>
                    <label htmlFor='description'><h3>Note</h3></label>
                    <textarea value={note.description} name='description' onChange={onChange} rows="6" type='text' id="description" placeholder='Note message'/>
                  </div>

                  <button disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} className='add-note-btn'>Add Note</button>
              </form>
          </div>

          <Notes/>
      </div>
  );
}
