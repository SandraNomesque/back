//estructura o esquema

const mongoose = require("mongoose")
const Schema = mongoose.Schema; //ODM = objetos para BD no relacionales y ORM = objetos para BD  relacionales 


const registroUModelo = new Schema(
    {
             
        nom:{
            type: String,
            required: true
        },
        usu:{
            type: String,
            unique: true,
            required: true
        },
        pass:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        }
    }
)

//model.exports = para utilizarlo en otras partes de mi aplicacion 
//model("nombre del modelo", nombre  esquema)= modelo para interactuar con la BD

module.exports = mongoose.model("registroUsuarios",registroUModelo)