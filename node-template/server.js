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
// importar el modelo que creamos 
const Producto = require("./modelos/prodModelo");

// importar el modelo que creamos para reto
const login = require("./modelos/loginModelo");//debe ir dentro de scr
const RegistroU = require("./modelos/registroUModelo");
//onst ListadoO = require("./modelos/listadoModelo");
const ListadoO = require("./modelos/registroOrdenModelo");
const RegistroO = require("./modelos/registroOrdenModelo");

//Parsea los datos a json
app.use(bodyParser.json());

//Middleware
app.use(cors())


app.post("/login", (req, res) => {
    //const data = req.body

    console.log(req);
    const { usu, pass }= req.body //{ usu: "admin", pass:"1234" }

   // const passCifrado = crypto.createHash("sha256").update(pass).digest("hex");

    login.findOne({usu, pass}, (error, dataUsu) => {
        if (error) {
           console.log(error);
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
            console.log(error);
            return res.send({ msg: "Error al guardar registro", estado: "error" })
        }
        return res.send({ msg: " Registro guardado con éxito", estado: "ok", url:"/Loguearse" })
    })
})

app.post("/registroOrden/guardar", (req, res) => {
    const data = req.body

    console.log(data);
    //Instrucciones para guardar en BD
    const orden = new RegistroO(data);
    orden.save((error) => {  // para salvarlo en la DB
        if (error) {
            console.log(error);
            return res.send({ msg: "Error al guardar registro de la Orden", estado: "error"  })
        }
        return res.send({ msg: " Orden guardado con éxito", estado: "ok" })
        //return res.send({ msg: " Orden guardado con éxito", estado: "ok", url:"/ListadoOrdenes" })
        
    })
})

app.get("/listadoOrdenes/list", (req, res) => {
   /*ListadoO.find({}, (error, lOrden) => {
        if (error) {
          //  console.log(error);
            return res.send({ estado: "error", msg: "Error al listar" })
        } else {
            if (lOrden !== null) {
                console.log(lOrden);
                //return res.send({ estado: "ok", msg: "ok", data: lOrden})
                return res.send({lOrden})
            } else {
                return res.send({ estado: "error", msg: "Sin ordenes para listar" })
            }
        }
    })*/

    const listado = ListadoO.find((error, lOrden) =>{
        console.log(listado);
        if (listado ){
            return res.send({lOrden})           

        }

    })
})

app.post("/actualizacion/consultar", (req, res) => {
    //const data = req.body

    console.log(req);
    const { CCD }= req.body //{ usu: "admin", pass:"1234" }

   // const passCifrado = crypto.createHash("sha256").update(pass).digest("hex");

    login.findOne({usu, pass}, (error, dataUsu) => {
        if (error) {
           console.log(error);
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
                            return res.send({ estado: "ok", msg: "Producto actualizado :)" });
                        return res.send({ estado: "error", msg: "Producto NO modificado :(" });
                    }
                    return res.send({ estado: "error", msg: "Error al actualizar :<" });
                }
            );
    })
// para mirar lo que esta en la varioable 
//console.log(RegistroU)


app.post("/producto/get", (req, res) => {
    const { nombre } = req.body
    if (nombre === prodNom) {
        return res.send({ precio: prodPrecio, stock: prodStock })
    }
    res.send({ msg: "No encontrado :'(", estado: "error" })
})

app.post("/producto/delete", (req, res) => {
    const { nombre } = req.body
    if (nombre === prodNom) {
        prodNom = "";
        prodPrecio = "";
        prodStock = "";
        return res.send({ msg: "Producto Eliminado!", estado: "ok" })
    }
    res.send({ msg: "No encontrado :'(", estado: "error" })
})

app.post("/producto/update", (req, res) => {
    const { nombre, precio, stock } = req.body
    if (nombre === prodNom) {
        prodNom = nombre;
        prodPrecio = precio;
        prodStock = stock;
        return res.send({ msg: "Producto Editado", estado: "ok" })
    }
    res.send({ msg: "No encontrado :'(", estado: "error" })
})

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