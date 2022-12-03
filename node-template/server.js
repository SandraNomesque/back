"use strict";
//Importa la libreria express
const express = require("express");
//Parsear el contenido a JSON
const bodyParser = require("body-parser");
const cors = require("cors");

// importar la libreria de mongoose 
const mongoose = require ("mongoose");

// Instancia el framework express
const app = express();


// importar el modelo que creamos para reto
//const login = require("./modelos/loginModelo");//debe ir dentro de scr
const login = require("./src/modelos/registroUModelo");//debe ir dentro de scr
const RegistroU = require("./src/modelos/registroUModelo");
const ListadoO = require("./src/modelos/registroOrdenModelo");
const RegistroO = require("./src/modelos/registroOrdenModelo");

//Parsea los datos a json
app.use(bodyParser.json());

//Middleware
app.use(cors())


app.post("/login", (req, res) => {
    //const data = req.body

    console.log(req);
    const { usu, pass }= req.body //{ usu: "admin", pass:"123" }

   // const passCifrado = crypto.createHash("sha256").update(pass).digest("hex");

    login.findOne({usu, pass}, (error, dataUsu) => {
        if (error) {
          // console.log(error);
            return  res.send({ estado: "Error al logearse", url: "error" })
        } else {

            if(dataUsu !== null){
                console.log(dataUsu);
                return res.send({estado: "ok", url:"/ListadoOrdenes"})
            }
        }
        return res.send({msg:"Error al logear", estado: "Error" })
    })
})

app.post("/registroUsuarios/guardar", (req, res) => {
    const data = req.body

    console.log(data);
    //Instrucciones para guardar en BD
    const prod = new RegistroU(data);
    prod.save((error) => {  // para salvarlo en la DB
        if (error) {
           
            return res.send({ msg: "Error al guardar registro", estado: "error" })
        }
        return res.send({ msg: " Registro guardado con éxito", estado: "ok", url:"/Loguearse" })
    })
})

app.post("/registroOrden/guardar", (req, res) => {
    const data = req.body
   
    //Instrucciones para guardar en BD
    const orden = new RegistroO(data);
    orden.save((error) => {  // para salvarlo en la DB
        if (error) {
            console.log(error);
            return res.send({ msg: "Error al guardar registro de la Orden", estado: "error"  })
        }
        return res.send({ msg: " Orden guardado con éxito", estado: "ok" , url:"/ListadoOrdenes" })
     
    })
})

app.post("/listadoOrdenes/list", (req, res) => {
   ListadoO.find({}, (error, lOrden) => {
        if (error) {
           console.log(error);
            return res.send({ estado: "error", msg: "Error al listar" })
        } else {
            if (lOrden !== null) {
                console.log(lOrden);
                return res.send({ estado: "ok", msg: "ok", data: lOrden})
                
            } else {
                return res.send({ estado: "error", msg: "Sin ordenes para listar" })
            }
        }
    })

})

app.post("/actualizacion/consultar", (req, res) => {
    
    const {id} = req.body
    console.log(id);
    ListadoO.find({_id:id}, (error, Orden) => {
        if (error) {
           console.log(error);
            return res.send({ estado: "error", msg: "Error al buscar" })
        } else {
            if (Orden !== null) {
                console.log(Orden);
                return res.send({ estado: "ok", msg: "ok", data: Orden})
                
            } else {
                return res.send({ estado: "error", msg: "producto no encontrado" })
            }
        }
    })

})

//actuliza  orden
app.post("/actualizacion/update", (req, res) => { //update
   
        const { fecha, hora, estado, largo, ancho, alto, peso, dirR, ciuR, nomD, ccD, dirD, ciuD} = req.body
    
        RegistroO.updateOne({ ccD }
            , {
                $set:
                {
                    fecha: fecha,
                    hora: hora,
                    estado: estado,
                    largo:largo,
                    ancho: ancho,
                    alto: alto,
                    peso: peso,
                    dirR: dirR,
                    ciuR: ciuR,
                    nomD: nomD,
                    ccD: ccD,
                    dirD: dirD,
                    ciuD: ciuD,
                }
            })
            .exec(
                (error, result) => {
                    if (!error) {
                        //Si modifico un documento
                        if (result.modifiedCount > 0)
                            return res.send({ estado: "ok", msg: "Producto actualizado :)", url:"/ListadoOrdenes" });
                        return res.send({ estado: "error", msg: "Producto NO modificado :(" });
                    }
                    return res.send({ estado: "error", msg: "Error al actualizar :<" });
                }
            );
    })
// para mirar lo que esta en la varioable 
//console.log(RegistroU)




//mongodb+srv://sandra:<password>@cluster0.inunada.mongodb.net/?retryWrites=true&w=majority
//para conectarse a la dase de datos mongo 
const dirDB= "mongodb+srv://sandra:Sandra01@cluster0.inunada.mongodb.net/tienda?retryWrites=true&w=majority";

mongoose.connect(dirDB)
.then (res => console.log ("conectado a DB"))
.catch(err => console.log(err))

mongoose.connection.on("open", _ => {
    console.log("db se conecto ", dirDB);
})
//mongoose.connection.on("error", err => {
//    console.log("error : ", err);
//})



//
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});