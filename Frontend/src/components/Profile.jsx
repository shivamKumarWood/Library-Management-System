import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));

  
  const user_id = userData.user_id;

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          params: { user_id }
        });
        
        console.log("Fetched books: ", response.data);
        setBorrowedBooks(response.data.borrowedBooks);
        console.log(Array.isArray(borrowedBooks));
      } catch (error) {
        console.error('Error fetching borrowed books:', error.response ? error.response.data : error.message);
      }
    };

    fetchBorrowedBooks();
  }, [user_id]);

  const handleReturnBook = async (book_id) => {
    try {
      await axios.delete("http://localhost:3000/api/return", {
        params: { user_id, book_id }
      });
      setBorrowedBooks(borrowedBooks.filter(book => book.book_id !== book_id));
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email_id}</p>
        <h3>Borrowed Books</h3>
        <table>
          <thead>
            <tr>
              <th>Book_id</th>
              <th>Book Name</th>
              <th>Book category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(borrowedBooks) &&borrowedBooks.map((book) => (
              <tr key={book.borrowed_id}>
                <td>{book.book_id}</td>
                <td>{book.name}</td>
                <td>{book.category}</td>
                <td>
                  <button onClick={() => handleReturnBook(book.book_id)}>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;