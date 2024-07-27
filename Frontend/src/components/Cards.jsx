import React from 'react';

function Cards({ item }) {
  return (
    <div className="card-container">
      <div className="card">
        <figure>
          <img src={item.image} alt="Shoes" className="card-image"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <div className="card-actions">
            <div className="badge badge-outline">Quantity:{item.price}</div>
            <div className="borrow-now">Borrow Now</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;

