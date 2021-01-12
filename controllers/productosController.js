let db = require("../database/models");

let productosController = {
    crear: function (req, res){
        db.Category.findAll()
        .then(function(categorys){
            return res.render("productoCreate", {categorys : categorys});
        })

    },
    guardado: async function (req, res, next){

        const files = req.files;
        const images = files.map( image => image.filename);

        let product = await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category,
            description: req.body.description,
            information: req.body.information,

        });
        res.redirect("/")
    },

    list: (req, res, next) => {
        db.Product.findAll().then((products)=>{
            res.render("allProducts", {products})
        })
    },

    detail: async (req, res) => {
        const id = req.params.id;
        const product = await db.Product.findByPk(id, {
            include: [{association:"category"}]
        })
        
        res.render("producto", {product});
    },

    editar: function (req, res){
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCategory = db.Category.findAll();

        Promise.all([pedidoProducto, pedidoCategory])
        .then(function([product, categorys]){

            res.render("productoEdit", {product:product, categorys: categorys})
        })
    },

    actualizar: function (req, res){
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category,
            description: req.body.description,
        }, {
            where:{
                id:req.params.id
            }

        });

        res.redirect("/products/detail/" + req.params.id)
    },

    borrar: function (req, res){
        db.Product.destroy({
            where:{
                id: req.params.id
            }
        })

        res.redirect("/products/");
}
}
module.exports = productosController