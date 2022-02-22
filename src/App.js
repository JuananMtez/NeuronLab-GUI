
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Grafica from './pages/Grafica'


function App() {
  
  return (
    <Routes>
      <Route path = "/" element = {<Navigate to="/login" />}/>
      <Route path = "login" element = {<Login/>}/>
      <Route path = "grafica" element = {<Grafica/>}/>
    </Routes>
  );
}

export default App;
