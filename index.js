

class ProductsManager{
    constructor(){
        this.products=[]
    }

    addProducts(title,description,price,thumbnail,stock){

        if (!title || !description || !price || !thumbnail || !stock) {
            console.log("Hay campos sin completar");
            return;
        }


        let existe=this.products.find(products=>products.thumbnail===thumbnail)
        if(existe){
            console.log(`El usuario con email ${code} ya existe...!!!`)
            return 
        }
        let code = 1
        if(this.products.length>0){
            code=this.products[this.products.length-1].code +1
        }

        let newUser={ title,description,price,thumbnail,code,stock}
        this.products.push(newUser)
    }

    getProducts(){
        return this.products
    }

    getProductsByCode(code){
        let product=this.products.find(u=>u.code===code)
        if(!product){
            console.log(`${code} not found`)
            return 
        }

        return product
    }
}


let pr=new ProductsManager()

pr.addProducts("TLOU", "description","5","img1","3")
pr.addProducts("RDR2", "description2","2","img2","6")


console.log(pr.getProducts())

console.log(pr.getProductsByCode(2));

console.log(pr.getProductsByCode(3));







