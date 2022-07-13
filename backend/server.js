const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
app.use(cors());

// routes
app.get("/api/v1", (req, res) => {
  res.json({ time: Date().toString() });
});

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
