
module.exports = function(sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type:dataTypes.STRING
        },
        last_name:{
            type:dataTypes.STRING
        },
        email: {
            type:dataTypes.STRING
        },
        password: {
            type:dataTypes.STRING
        },
        
        rol: {
            type:dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }
    let User = sequelize.define(alias,cols,config);
    return User;
}