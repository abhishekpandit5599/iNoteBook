import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Navbar from './Components/Navbar/Navbar';
import NoteSate from './Context/notes/NoteState';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NoteSate>
        <div className="app-container">
        <Navbar/>

        
          <Routes>
          <Route exact path="/iNoteBook" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
                    
          </Routes>
        
        
        </div>
      </NoteSate>
    </BrowserRouter>
  );
}

export default App;
