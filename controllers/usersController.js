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
    },

    login: (req, res) => {
        res.render("login");
     },

    /* ingresoUsuario: (req, res) => {

        
        const validation = validationResult(req);
		
		if(!validation.isEmpty()){	
			return res.render('login',{errors:validation.errors});
		}else{
            const email= req.body.email;
            const password = req.body.password;
            const users = getAllUsers();
            
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
    profile: (req, res) => {

        const user =  req.session.user;
       
        res.render("profile", {
            id:user.id,
            nombre:user.nombre,
            apellido: user.apellido,
            email: user.email,
            image: user.image

        });
     },

*/   
};
 


module.exports = usersController;