//estructura o esquema

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//const prodModel = new Schema(
const listadoModelo = new Schema(
    {
        
        fecha:{
            type: Date,
            required: true
        },
        ciuD:{
            type: String,
            required: true
        },
        dirD:{
            type: String,
            required: true
        },
        estado:{
            type: String,
            required: true
        }
      
    }
)

//model.exports = para utilizarlo en otras partes de mi aplicacion 
//model("nombre del modelo", nombre  esquema)= modelo para interactuar con la BD

module.exports = mongoose.model("listadoOrdenes", listadoModelo)
