const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//importing api route
const registerRouter = require("./src/routes/register");

// using the express application
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// body parser added
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(registerRouter);
app.listen(port, (err) => {
  if (!err) {
    console.log("Server is Listening ...");
  } else {
    console.log("Server is not Listening ...");
  }
});
