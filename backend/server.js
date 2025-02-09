require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
<<<<<<< HEAD
app.use('/api/weather', require('./routes/weather'));
app.use("/api/submitProduct", require("./routes/submit-product"));
=======
app.use('/api', require('./routes/weather'));
>>>>>>> f811cefb62554fcbfa4a6eb9b94da4ae1054e758

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});