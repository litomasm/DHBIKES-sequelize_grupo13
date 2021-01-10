let db = require("../database/models");

let productosController = {
    crear: function (req, res){
        db.Category.findAll()
        .then(function(categorys){
            return res.render("productoCreate", {categorys : categorys});
        })

    },
    guardado: function (req, res){
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category,
            description: req.body.description,


        });
        res.redirect("/")
    }
}

module.exports = productosController;