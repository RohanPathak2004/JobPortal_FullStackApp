import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import AddJob from "./pages/AddJob.jsx";
import Search from "./pages/Search.jsx";
import UpdateAndDeleteJobPost from "./pages/UpdateAndDeleteJobPost.jsx";
import JobContextProvider, {JobContext} from "./context/JobContext.jsx";

function App() {


  return (
    <JobContextProvider>
        <NavigationBar/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/addJob" element={<AddJob/>}></Route>
          <Route path="/search" element={<Search/>} ></Route>
          <Route path="/jobPost/:postId" element={<UpdateAndDeleteJobPost/>}></Route>
      </Routes>
    </JobContextProvider>
  )
}

export default App
