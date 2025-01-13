require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const postsRoutes = require('./routes/postsRoutes')

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.use((req, res, next) => {
	console.log("Path: ", req.path);
	console.log("Method: ", req.method);

	next();
});

// Routes
app.use('/api/posts', postsRoutes)

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB!")
  })
  .catch((err) => {
    console.log("Error occured when connecting to DB: ", err)
  })

app.listen(4000, () => console.log(`Server running at port 4000`))