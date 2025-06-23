import React, { Children } from "react"
import { Navigate,BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/NavBar'
import Feed from "./components/Feed";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MyProfile from "./components/MyProfile";
import Upload from "./components/Upload";
import { useAuth } from "./context/Authcontext";

const PrivateRoute=({children})=>{
  const {token}=useAuth();
  return token?children:<Navigate to='/login' replace/>
}

function App() {
  

  return (
    <>
    <Router>
      <Appbar/>
      <Routes>
        <Route path="/feed" element={<Feed/>} />
        <Route path="/upload" element={<PrivateRoute><Upload/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><MyProfile/></PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/*" element={<Feed/>} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App
