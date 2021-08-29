const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

//create express app
const app = express();

//db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("**DB connected**");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

connectDB();

// apply middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
