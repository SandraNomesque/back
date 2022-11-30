//estructura o esquema

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//const prodModel = new Schema(
const registroOrdenModelo = new Schema(
    {
        
        fecha:{
            type: Date,
            required: true
        },
        hora:{
            type: String,
            required: true
        },
        estado:{
            type: String,
            required: true
        },
        largo:{
            type: String,
            required: true
        },
        ancho:{  
            type: String,
            required: true
        },
        alto:{
            type: String,
            required: true
        },
        peso:{
            type: String,
            required: true
        },
        dirR:{
            type: String,
            required: true
        },
        ciuR:{
            type: String,
            required: true
        },
        nomD:{
            type: String,
            unique: true,
            required: true
        },
        ccD:{
            type: String,
            required: true
        },
        dirD:{
            type: String,
            required: true
        },
        ciuD:{
            type: String,
            required: true
        }
      
    }
)

//model.exports = para utilizarlo en otras partes de mi aplicacion 
//model("nombre del modelo", nombre  esquema)= modelo para interactuar con la BD

module.exports = mongoose.model("registroOrden",registroOrdenModelo)