import React from 'react'
import Navbar from "../Navbar"
import Footer from "../Footer"
import Cards from "../Cards"
import list from "../../../public/list.json"
import  { useState } from 'react';
function Library() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }
  return (
    <>
      <div className="library-container">
        <div className="library-items">
          <Navbar/>
          <div className="library-head">
             <h2 className="library-heading">Welcome to our library. You can select the category.</h2>
          </div>
          <div className="dropdown">
           <label htmlFor="category">Select Category:</label>
            <select id="category" name="category" value={selectedCategory} onChange={handleChange}>
              <option value="">All Category</option>
              <option value="sports">Sports Book</option>
              <option value="recipe">Recipe Book</option>
              <option value="poetry">Poetry</option>
              <option value="novel">Novel</option>
              <option value="drama">Drama</option>
            </select>
          </div>
          <div className="library-cards">
          { list.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default Library
