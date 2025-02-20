require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
// Add this at the top with other requires
const expressLayouts = require('express-ejs-layouts');

// Add this middleware AFTER setting view engine

// Database connection
const pool = require('./db');

// Middleware
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');  // Set default layout
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Add this middleware:
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});



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

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected at: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send(`Database connection failed: ${err.message}`);
  }
});
