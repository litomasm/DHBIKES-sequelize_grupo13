const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req, res) => {

        let user={};
        if(req.session.user){
            user = req.session.user;
        }
        
        if(user == undefined){
            res.render("carrito")
        } else{
            res.render("carrito",{id:user.id})
        }
       
      
    },

   
};

module.exports = controller;