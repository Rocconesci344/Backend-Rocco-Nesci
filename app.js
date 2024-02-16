
const express=require("express")
const products = require('./exported_products.json');
const PORT = process.env.PORT || 3001;

const app=express()

app.get("/", (req, res)=>{

    res.send("Server básico con Express...!!!")
})

app.get("/products", (req, res)=>{


    let {limit, skip}=req.query

    let resultado=products
    if(skip && skip>0){
        resultado=resultado.slice(skip)
    }

    if(limit && limit>0){
        resultado=resultado.slice(0, limit)
    }


    res.json(resultado)
})


app.get("/products/:id", ( req, res)=>{

    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        return res.send("El id tiene que ser de tipo numérico")
    }

    let product=products.find(product=>product.id===id)
    if(!product){
        return res.send(`No existen productos con id ${id}`)
    }

    res.json(product)
})

app.get("*", (req, res)=>{

    res.send("error 404 - Pagina Inexistente")
})

app.listen(PORT, ()=>{
    console.log(`Server OK en puerto ${PORT}`)
})