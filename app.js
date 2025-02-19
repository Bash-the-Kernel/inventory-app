require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// Database connection
const pool = require('./db');

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Routes
const categoriesRoutes = require('./routes/categories');
const itemsRoutes = require('./routes/items');
app.use('/categories', categoriesRoutes);
app.use('/items', itemsRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/categories');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});