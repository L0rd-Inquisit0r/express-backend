const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
