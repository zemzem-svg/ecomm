
const express =require("express")
const connectDB = require("./config/dbconnect")
const app = express();
require('dotenv').config();

//routes
app.use(express.json())
app.use("/user",require("./routes/user"));
app.use("/products",require("./routes/product"));

connectDB();

const PORT = process.env.PORT;
app.listen(PORT,(err)=>err?console.log(err):console.log(`Server is running well with the port ${PORT}`))