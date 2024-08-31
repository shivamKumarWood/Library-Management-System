import React from 'react';
import img2 from "../../public/img2.jpg"
import toast from 'react-hot-toast';
function Cards({ item ,updateBookQuantity }) {
  const handleBorrow = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in to borrow a book.');
      return;
    }
    const user_id = user.user_id;
    try {
      const response = await fetch('http://localhost:3000/api/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, book_id: item.book_id }),
      });

      if (response.ok) {
        toast.success("Book borrowed successfully");
        // You might want to trigger a refresh of the book list here to update quantities
        updateBookQuantity(item.book_id, item.quantity - 1);
      } else {
        const message = await response.text();
        alert("Error:",message);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast.error('An error occurred while borrowing the book');
    }
  };
  return (
    <div className="card-container">
      <div className="card">
        <figure>
          <img src={img2} alt="Shoes" className="card-image"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <div className="card-actions">
            <div className="badge badge-outline">Quantity:{item.quantity}</div>
            <div className="borrow-now"  onClick={handleBorrow}>Borrow Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;

