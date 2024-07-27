import React from 'react'
import img1 from "../../public/img1.jpg"
import {Link} from "react-router-dom"
function Body() {
  return (
    <>
    
    <div className="container-body">
      <div className="left">
        <h1 className="body-head">Welcome to World's finest  <span className="body-span">Library Management System</span></h1>
        <p className="body-para">Here you will get books related to different topics.
        You can efficiently borrow or return a book from our library. We have books of different category such as Sports book, Receipe book, Novel, Poetry, Drama.</p>
        <p className="body-para1">You must be logged in to visit the library.</p>
        <div>
        <Link to="/library">
           <button className="library-btn">Go to Library</button>
        </Link>
      </div>
      </div>
      <div className="right">
        <img src={img1} alt="Library image" />
      </div>
      
    </div>
    </>
  )
}

export default Body;
