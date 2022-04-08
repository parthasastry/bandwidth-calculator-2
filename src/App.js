import React from "react";

import { Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {


  return (
    <div>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
