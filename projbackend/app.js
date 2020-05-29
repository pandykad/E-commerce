require('dotenv').config()


const mongoose = require("mongoose")
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")


//DB COnnection
mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true, 
}).then(() => {
    console.log("DB CONNECTED")
}).catch(console.log("DB GOT OOPSS"))

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)

//Port
const port = process.env.port || 8000;




//Starting Server
app.listen(port, () => {
    console.log(`app is running at ${port}`)
})