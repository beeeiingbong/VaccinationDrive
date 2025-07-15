require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const immunisationRoutes = require('./routes/vaccination.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Use the new immunisation routes
app.use('/immunisation', immunisationRoutes); // <-- Updated

// Redirect root to the form
app.get('/', (req, res) => {
    res.redirect('/immunisation'); // <-- Updated
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT}/students to see the form.`);
});