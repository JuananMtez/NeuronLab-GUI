
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Grafica from './pages/Grafica'
import Register from './pages/Register'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Subjects from './pages/Subjects';
import Experiments from './pages/Experiments';
import AddSubject from './pages/AddSubject';
import DataSubject from './pages/DataSubject';


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="grafica" element={<Grafica/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="subjects" element={<Subjects/>}/>
      <Route path="experiments" element={<Experiments/>}/>
      <Route path="subject/add" element={<AddSubject/>}/>
      <Route path="subject/data" element={<DataSubject/>}/>

    </Routes>
  );
}

export default App;
