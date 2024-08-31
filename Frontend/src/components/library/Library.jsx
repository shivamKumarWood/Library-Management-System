import React from 'react'
import Navbar from "../Navbar"
import Footer from "../Footer"
import Cards from "../Cards"
import axios from "axios"
import list from "../../../public/list.json"

import { useEffect, useState } from 'react';
function Library() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books', {
          params: selectedCategory ? { category: selectedCategory } : {}
        });
        console.log('Fetched books:', response.data); // Log the fetched data
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [selectedCategory]);
  const updateBookQuantity = (book_id, newQuantity) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.book_id === book_id ? { ...book, quantity: newQuantity } : book
      )
    );
  };

  return (
    <>
      <div className="library-container">
        <div className="library-items">
          <Navbar />
          <div className="library-head">
            <h2 className="library-heading">Welcome to our library. Please select the category.</h2>
          </div>
          <div className="dropdown">
            <label htmlFor="category">Select Category:</label>
            <select id="category" name="category" value={selectedCategory} onChange={handleChange}>
              <option value="">All Category</option>
              <option value="Sports">Sports</option>
              <option value="Recipe">Recipe</option>
              <option value="Poetry">Poetry</option>
              <option value="Novel">Novel</option>
              <option value="Drama">Drama</option>
              <option value="Programming">Programming</option>
            </select>
          </div>
          <div>
            <div className="profile-section">
              <h3 className="library-heading">You can visit your profile here</h3>
              <a href="/profile" className="btn profile-btn">Profile</a>
            </div>
          </div>
          <div className="library-cards">
            {books.map((item) => (
              <Cards key={item.id} item={item} updateBookQuantity={updateBookQuantity} />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Library
