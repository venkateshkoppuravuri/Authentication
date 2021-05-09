const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//importing api route
const userRouter = require("./src/routes/users");

// using the express application
const app = express();
const port = process.env.PORT || 3002;
app.use(cors());

// body parser added
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRouter);
app.listen(port, (err) => {
  if (!err) {
    console.log("Server is Listening ...");
  } else {
    console.log("Server is not Listening ...");
  }
});
