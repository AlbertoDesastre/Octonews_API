const fileUpload = require("express-fileupload");
const express = require("express");
const { checkErrors, notFound } = require("./middlewares");
const cors = require("cors");
require("dotenv").config();

const app = express();

//First middlewares

//CORS

app.use(cors());

//bodyparser

app.use(express.json());
//formparser
app.use(fileUpload());

//import routes
app.use(require("./routes/news"));
app.use(require("./routes/users"));

//Last middlewares
//Check if an error ocurred and send a response with the error.
app.use(checkErrors);

//Call this function if the endpoint doesn't exists
app.use(notFound);

//Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Lanzado en puerto: ${port}`);
});
