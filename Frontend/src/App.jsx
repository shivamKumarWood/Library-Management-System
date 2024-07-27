import React from "react"
import {Route,Routes  } from "react-router-dom";
import Home from "./components/home/Home";
import Library from "./components/library/Library";
function App() {
 
  return (
     <>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/library" element={<Library/>}/>
        {/* <Route path="/signup" element={<Signup/>}/> */}
      </Routes>
      </div>
  </>
  );
}

export default App;
