const { validationResult } = require("express-validator");
let db = require("../database/models");

let usersController = {
    register: function (req, res){
        
            return res.render("registro");
        
    },
    processRegister: async(req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render('registro',{errors:validation.errors})
        }else {
            await db.user.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: passwordHashed,
                image: req.file.filename
    

        });
        res.redirect("/")}
    },
       login: (req, res) => {
        res.render("login");
     },

        processLogin: async (req, res) => {

        
        const validation = validationResult(req);
		
		if(!validation.isEmpty()){	
			return res.render('login',{errors:validation.errors});
		}else{
            const email= req.body.email;
            const password = req.body.password;
            const users = await db.User.findOne({where:{email:req.body.email}}); 
            
            const userExist = users.find((user) =>{
                return user.email === email;
            });

            if(userExist && bcryptjs.compareSync(password, userExist.password)) {
               
                req.session.user = userExist; 
                
                if (req.body.recordarme) {
                    res.cookie('email', userExist.email, { maxAge: 900000});
                }

                return res.redirect("/user/profile");  

            } else { 
                return res.render('login',{errors:[{msg: 'Credenciales invalidas'}]})
            }

        }     

     },
    profile: async (req, res, next) => {

        const user = await db.User.findOne({were: {email:req.session.User}})  
       
        res.render("profile", {
            id:user.id,
            nombre:user.nombre,
            apellido: user.apellido,
            email: user.email,
            image: user.image

        });
     },


};
 


module.exports = usersController;