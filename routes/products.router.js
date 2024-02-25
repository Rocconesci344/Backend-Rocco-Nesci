const Router =require("express").Router

// const express=require("express")
// const router=express.Router()

const router=Router()


router.get("/", (req, res)=>{


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


router.get("/:id", ( req, res)=>{

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





module.exports=router