//estructura o esquema

const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const loginModelo = new Schema(
    {
        usu:{
            type: String,
            unique: true,
            required: true
        },
        pass:{
            type: String,
            required: true
        }
    }
)

//model.exports = para utilizarlo en otras partes de mi aplicacion 
//model("nombre del modelo", nombre  esquema)= modelo para interactuar con la BD

module.exports = mongoose.model("login",loginModelo)