const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./config/connectDb");

//config dotenv file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev")); //configure morgan
app.use(express.json());
app.use(cors());

//routes
// app.get("/", (req, res) => {
//   res.send("Hello from server!");
// }); //for checking purpose

//user routes
app.use('/api/v1/users', require('./routes/userRoute'))
//transaction route
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))


//static file reading
app.use(express.static(path.join(__dirname, '/client/build' )))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});



//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.blue);
});
