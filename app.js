
import express from 'express';
import { router as cartRouter} from "./routes/cart.router.js";
import { router as productsRouter } from './routes/products.router.js';

const PORT = 8080;


const app=express()


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/carts", cartRouter)
app.use("/api/products", productsRouter )


app.get("/", (req, res)=>{

    res.send("Server básico con Express...!!!")
})

app.get("*", (req, res)=>{

    res.send("error 404 - Pagina Inexistente")
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

