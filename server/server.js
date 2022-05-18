require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
portNumber = 8000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser())
require("./config/mongoose.config")
require("./routes/covid.routes")(app)
require("./routes/user.routes")(app)

app.listen(process.env.MY_PORT, () => console.log(`You are connected to port ${process.env.MY_PORT}`) )