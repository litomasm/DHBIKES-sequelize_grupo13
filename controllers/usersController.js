let db = require("../database/models");

let usersController = {
    crear: function (req, res){
        
            return res.render("registro");
        
    },
    guardado: function (req, res){
        db.User.create({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,


        });
        res.redirect("/")
    }
}

module.exports = usersController;