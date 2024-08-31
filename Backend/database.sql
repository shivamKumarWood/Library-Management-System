CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    quantity INT
);

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the borrowed_books table
CREATE TABLE borrowed_books (
    borrowed_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    book_id INT REFERENCES books(book_id),
    borrow_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE
);