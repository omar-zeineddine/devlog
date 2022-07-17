const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// add routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");

// app
const app = express();

// db connection
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors in dev env
if (process.env.NODE_ENV === "dev") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", tagRoutes);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
