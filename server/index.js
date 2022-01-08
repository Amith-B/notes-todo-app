require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./routes");

const app = express();

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("build"));

// serve build content
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening at port: ${port}`);
});
