

const fs = require("fs");


class ProductsManager{
    constructor(path){
        this.products=[];
        this.path = path;
        this.loadProducts();
    }

    addProducts(title,description,price,thumbnail,stock, code){

        if (!title || !description || !price || !thumbnail || !stock || !code) {
            console.log("Hay campos sin completar");
            return;
        }


        let existe=this.products.find(products=>products.thumbnail===thumbnail)
        if(existe){
            console.log(`El usuario con id ${id} ya existe...!!!`)
            return 
        }
        let id = 1
        if(this.products.length>0){
            id=this.products[this.products.length-1].id +1
        }

        let newUser={ title,description,price,thumbnail,code,id,stock}
        this.products.push(newUser)
    }

    getProducts(){
        return this.products
    }

    getProductsById(id){
        let product=this.products.find(u=>u.id===id)
        if(!product){
            console.log(`${id} not found`)
            return 
        }

        return product
    }
    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProductsToFile();
        } else {
            console.log(`${id} not found`);
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProductsToFile();
        } else {
            console.log(`${id} not found`);
        }
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProductsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }
}


let pr = new ProductsManager('productos.json');

pr.addProducts("TLOU", "description","5","img1","3","22")
pr.addProducts("RDR2", "description2","2","img2","6","55")


console.log(pr.getProducts())

console.log(pr.getProductsById(2));

console.log(pr.getProductsById(3));


const updatedProductData = {
    title: 'Título',
    description: 'Nueva Descripción',
    price: '10',
    thumbnail: 'nueva_img',
    stock: '5',
    code: '99',
};

pr.updateProduct(3, updatedProductData);

console.log('Actualizacion realizada');
console.log(pr.getProducts());


// delete
// pr.deleteProduct(2);

console.log('Producto eliminado');
console.log(pr.getProducts());



