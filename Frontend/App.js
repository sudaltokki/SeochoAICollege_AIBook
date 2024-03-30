import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AudioServer from "./AudioServer";
import LoadingVideo from "./LoadingVideo";

import Main from "./Main";
import Login from './Login';
import SignUp from './SignUp';
import Keyword from './Keyword';

function App() {
  return (
      <BrowserRouter>
      <div>
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Keyword" element={<Keyword />} />
            <Route path="/AudAudioServerio" element={<AudioServer />} />
            <Route path="/AudioServer/:keyword" element={<AudioServer />} />
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
