const uploadUserMiddleware = function(req, res, next){

    const file= req.file;
    if(!file){
            const error= new Error('Por favor sube un foto');
            return res.render('registro',{error:error})
    }

    return next();
}

module.exports = uploadUserMiddleware;