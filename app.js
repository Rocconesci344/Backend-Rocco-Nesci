
const express=require("express")
const products = require('./exported_products.json');
const productsRouter=require("./routes/products.router")
const cartRouter=require("./routes/cart.router");
const PORT = process.env.PORT || 8080;

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter)
app.use("/api/cart",cartRouter )


app.get("/", (req, res)=>{

    res.send("Server básico con Express...!!!")
})





app.get("*", (req, res)=>{

    res.send("error 404 - Pagina Inexistente")
})

app.listen(PORT, ()=>{
    console.log(`Server OK en puerto ${PORT}`)
})