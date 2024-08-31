import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from "bcryptjs";
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "libraryManagement",
  password: "Shivam@55",
  port: 5432,
});
const app = express();
const port = 3000;
//middleware
app.use(cors());
app.use(express.json()); //req.body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();
// Endpoint to fetch all books
app.get('/api/books', async (req, res) => {
  const { category } = req.query;

  // Start with the base query to select all books
  let query = 'SELECT * FROM books';
  const values = [];

  // Modify the query if a specific category is provided
  if (category) {
    query += ' WHERE category = $1';
    values.push(category);
  }

  console.log('Executing query:', query); // Log the query
  console.log('With values:', values);    // Log the values

  try {
    const result = await db.query(query, values);
    console.log('Fetched books:', result.rows); // Log the data being sent
    res.json(result.rows); // Send the data as JSON
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).send('Server error');
  }
});
/*Signup page*/
app.post('/sign/user', async (req, res) => {
  const { name, email_id, password } = req.body;
  console.log('Name:', name);
  console.log('Email:', email_id);
  console.log('Password:', password); // Note: In a real application, avoid logging passwords

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (name, email_id, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email_id, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Detailed Error:', error); // Log detailed error information
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});
// Login route
app.post('/login/user', async (req, res) => {
  const { email_id, password } = req.body;
  try {
    const user = await db.query('SELECT * FROM users WHERE email_id = $1', [email_id]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Logged in successfully', user: user.rows[0] });
  } catch (error) {
    console.error('Detailed Error:', error); // Log detailed error information
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to borrow a book
app.post('/api/borrow', async (req, res) => {
  const { user_id, book_id } = req.body;

  try {
    // Check if the book quantity is greater than 0
    const bookResult = await db.query('SELECT quantity FROM books WHERE book_id = $1', [book_id]);
    const book = bookResult.rows[0];

    if (book && book.quantity > 0) {
      // Begin transaction
      await db.query('BEGIN');

      // Insert into borrowed_books
      await db.query(
        'INSERT INTO borrowed_books (user_id, book_id) VALUES ($1, $2)',
        [user_id, book_id]
      );

      // Update books table to decrease quantity by 1
      await db.query(
        'UPDATE books SET quantity = quantity - 1 WHERE book_id = $1',
        [book_id]
      );

      // Commit transaction
      await db.query('COMMIT');

      res.status(200).send("Book borrowed successfully");
    } else {
      res.status(400).send("Book is out of stock");
    }
  } catch (err) {
    await db.query('ROLLBACK');
    console.error("Error executing query", err.stack);
    res.status(500).send("Server Error");
  }
});
/*profile*/

app.get('/api/profile', async (req, res) => {
  const { user_id } = req.query;
  console.log(user_id);
  try {
    const userResult = await db.query('SELECT name, email_id FROM users WHERE user_id = $1', [user_id]);
    const borrowedBooksResult = await db.query(`
      SELECT borrowed_books.borrowed_id,borrowed_books.book_id, books.name, books.category
      FROM borrowed_books
      JOIN books ON borrowed_books.book_id = books.book_id
      WHERE borrowed_books.user_id = $1;
    `, [user_id])

    if (userResult.rows.length > 0) {
      const borrowedBooks = borrowedBooksResult.rows;
      console.log(borrowedBooks);
      res.json({ borrowedBooks });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Server Error");
  }
});
// Endpoint to return a borrowed book
app.delete('/api/return', async (req, res) => {
  const { user_id, book_id } = req.query;
  console.log("user id:",user_id);
  console.log("book id:",book_id);
  try {
    // Begin transaction
    await db.query('BEGIN');

    // Delete from borrowed_books
    await db.query('DELETE FROM borrowed_books WHERE user_id = $1 AND book_id = $2', [user_id, book_id]);

    // Update books table to increase quantity by 1
    await db.query('UPDATE books SET quantity = quantity + 1 WHERE book_id = $1', [book_id]);

    // Commit transaction
    await db.query('COMMIT');

    res.status(200).send("Book returned successfully");
  } catch (err) {
    await db.query('ROLLBACK');
    console.error("Error executing query", err.stack);
    res.status(500).send("Server Error");
  }
});

// Sample protected route
app.get('/dashboard', async (req, res) => {
  // Assuming you have a mechanism to identify logged in users
  // For simplicity, we're just sending a success message
  res.json({ message: 'Welcome to your dashboard' });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
