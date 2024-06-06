const express = require("express");
const path = require("path")
const mongoose = require("mongoose")
const http = require("http")
const handlebars = require("express-handlebars")
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/cart.router")
const {viewsRouter, handleRealTimeProductsSocket} = require("./routes/views.router");
const sessionsRouter = require("./routes/sessions.router.js")
const socketIO = require("socket.io");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./config/passport.config");
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const connectMongo = require("connect-mongo");


const PORT = 3000;
const app = express();
const server = http.createServer(app)


app.use((req, res, next) =>{
    logger.http(`${req.method} - ${req.url}`);
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    store: connectMongo.create({mongoUrl: "mongodb+srv://rocconesci344:344a2344@rocco-nesci-backend.atqrp5y.mongodb.net/?retryWrites=true&w=majority&appName=Rocco-nesci-backend"})
}))


passportConfig()
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, "public")))

app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/carts", cartRouter)

server.listen(PORT, () => {
    logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });

const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://rocconesci344:344a2344@rocco-nesci-backend.atqrp5y.mongodb.net/?retryWrites=true&w=majority&appName=Rocco-nesci-backend")
        logger.info("Conectado a MongoDB");
    }catch(error){
        logger.error(`Error al conectar a MongoDB: ${error.message}`);
    }
}

connect()

