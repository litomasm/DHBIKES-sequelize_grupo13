let db = require("../database/models");
const { Op } = require("sequelize");

let productosController = {
    crear: function (req, res){
        db.Category.findAll()
        .then(function(categorys){
            return res.render("productoCreate", {categorys : categorys});
        })

    },
    guardado: async function (req, res, next){

        
        await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category,
            image: req.files[0].filename,
            description: req.body.description,
            information: req.body.information,

        });
        res.redirect("/products/")
    },

    list: (req, res, next) => {
        db.Product.findAll().then((products)=>{
            res.render("allProducts", {products})
        })
    },

    search: async function (req,res,next){
        let query = req.query.search_query;
        const productList = await db.Product.findAll({
          where: {name : {[Op.like]: '%'+query+'%'}}
        },{
          include: ['categorys']
        });
        const categories = await db.Category.findAll()
        const rooms = await db.Room.findAll()
        return res.render('products/list',{products:productList,categories:categories})
      }
      ,
      filter: async function (req,res,next){
        const productList = await db.Product.findAll({
          include: ['categorys']
        },
        {where: {
            [Op.and]: [
              { category_id: req.query.category_id},
              
            ]
          }
        });
      const categories = await db.Category.findAll()
      const rooms = await db.Room.findAll()
      const benefits = await db.Benefit.findAll()
      return res.render('products/list',	{products:productList, categories:categories})
      },

    detail: async (req, res) => {
        const id = req.params.id;
        const product = await db.Product.findByPk(id, {
            include: [{association:"category"}]
        })
        
        res.render("producto", {product});
    },

    editar:  function (req, res, next){
        let pedidoProducto =  db.Product.findByPk(req.params.id);
        let pedidoCategory =  db.Category.findAll();

        Promise.all([pedidoProducto, pedidoCategory])
        .then(function([product, categorys]){

            res.render("productoEdit", {product:product, categorys: categorys})
        })
    },

    actualizar:  function (req, res){
         db.Product.update({
            name: req.body.name,
            price: req.body.price,
            category_id: req.body.category,
            image: req.files[0] ? req.files[0].filename : product.image,
            description: req.body.description,
            information: req.body.information,
        }, {
            where:{
                id:req.params.id
            }

        })

        if (typeof req.files[0] !== 'undefined'){
            db.Product.update({
            image: req.files[0].filename},
            {where:{id:req.params.id}}
            )
          }

       
        res.redirect("/products/")
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