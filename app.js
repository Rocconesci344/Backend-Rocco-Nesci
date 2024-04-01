const express = require("express");
const path = require("path")
const mongoose = require("mongoose")
const http = require("http")
const handlebars = require("express-handlebars")
const productRouter = require("./routes/products.router")
const cartRouter = require("./routes/cart.router")

const PORT = 8080;
const app = express();
const server = http.createServer(app);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))

app.engine("handlebars", handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))


app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://rocconesci344:344a2344@rocco-nesci-backend.atqrp5y.mongodb.net/?retryWrites=true&w=majority&appName=Rocco-nesci-backend")
        console.log("Conectado a MongoDB")
    }catch(error){
        console.error("Error al conectar a MongoDB", error)
    }
}

connect()

