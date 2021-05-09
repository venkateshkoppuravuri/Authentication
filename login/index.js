const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//importing api route
const loginRouter = require("./src/routes/login");

// using the express application
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

// body parser added
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(loginRouter);
app.listen(port, (err) => {
  if (!err) {
    console.log("Server is Listening ...");
  } else {
    console.log("Server is not Listening ...");
  }
});
