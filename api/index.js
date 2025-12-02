const express = require('express');
const cors = require('cors');
const connection = require('./db')

const app = express();
const PORT = 3000;

//Agregampos middleware para permitir trafico desde angular
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Registramos los endpoint necesarios
app.post('/savePiezas', (req, res) =>{
    const {numero_parte, descripcion, cantidad} = req.body;
    const sql = `INSERT INTO Piezas (numero_parte, descripcion, cantidad)
    VALUES(?,?,?)`;
    connection.query(sql, [numero_parte, descripcion, cantidad], (err, result) => {
        if(err){
            return res.status(500).json({mensaje: 'Error al insertar datos'});
        }
        console.log("Datos registrados de manera correcta");
        res.status(201).json({
            mensaje: "registro exitoso",
            idGenerado: result.insertId
        })
    });
});

// En tu index.js o app.js
app.get('/piezas', (req, res) => {
    const sql = 'SELECT * FROM Piezas';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener datos' });
        }
        res.status(200).json(results);
    });
});


//metodo para obetener todo el resultado el getAll
app.get('/getAllPiezas',(req,res)=>{
    const sql = 'SELECT*FROM Piezas';
    connection.query(sql,(err, response)=>{
        if (err) {
            return res.status(500).json({mensaje:'Error al consultar la base de datos'});
        }
        res.status(200).json(response);
    });
});

app.get('/getPiezas/:filtro',(req,res)=>{
    const sql = 'SELECT*FROM Piezas WHERE id = ? OR descripcion LIKE ?';
    const {filtro} = req.params;

    connection.query(sql,[filtro,'%'+filtro+'%'],(err,result)=>{
        if (err) {
            return res.status(500).json({mensaje:'Error al consultar la base de datos'})
        }
        if (result.length ==0) {
            return res.status(200).json({mensaje:'Sin coincidencias'})
        }
        res.status(200).json(result)
    })
});

//Endpoints de trabajos
app.post('/saveTrabajos', (req, res) =>{
    const {cliente, descripcion, empleados_asignados, diagnostico, marca, modelo, numero_serie} = req.body;
    const sql = `INSERT INTO Trabajos (cliente, descripcion, empleados_asignados, diagnostico, marca, modelo, numero_serie)
    VALUES(?,?,?,?,?,?,?)`;
    connection.query(sql, [cliente, descripcion, empleados_asignados, diagnostico, marca, modelo, numero_serie], (err, result) => {
        if(err){
            return res.status(500).json({mensaje: 'Error al insertar datos'});
        }
        console.log("Datos registrados de manera correcta");
        res.status(201).json({
            mensaje: "registro exitoso",
            idGenerado: result.insertId
        })
    });
});

app.get('/trabajos', (req, res) => {
    const sql = 'SELECT * FROM Trabajos';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener datos' });
        }
        res.status(200).json(results);
    });   
});

app.get('/getTrabajo/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Trabajos WHERE id = ?';
    
    // CORRECCIÓN: Usa "connection" no "db"
    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ 
                mensaje: 'Error al consultar la base de datos',
                error: err.message 
            });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Trabajo no encontrado' });
        }
        res.status(200).json(result[0]); // Devuelve solo el primer resultado
    });
});

app.get('/getAllTrabajos',(req,res)=>{
    const sql = 'SELECT*FROM Trabajos';
    connection.query(sql,(err, response)=>{
        if (err) {
            return res.status(500).json({mensaje:'Error al consultar la base de datos'});
        }
        res.status(200).json(response);
    });
});

app.get('/getTrabajos/:filtro',(req,res)=>{
    const sql = 'SELECT*FROM Trabajos WHERE id = ? OR descripcion LIKE ?';
    const {filtro} = req.params;

    connection.query(sql,[filtro,'%'+filtro+'%'],(err,result)=>{
        if (err) {
            return res.status(500).json({mensaje:'Error al consultar la base de datos'})
        }
        if (result.length ==0) {
            return res.status(200).json({mensaje:'Sin coincidencias'})
        }
        res.status(200).json(result)
    })
});

app.delete('/deleteTrabajos/:id', (req, res)=>{
    const { id } = req.params;
    const query = 'DELETE FROM Trabajos WHERE id = ?';

    connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Trabajo eliminado' });
  });
});

app.put('/updateTrabajo/:id', (req, res) => {
  const { id } = req.params;
  const { cliente, descripcion, empleados_asignados, diagnostico, marca, modelo, numero_serie } = req.body;
  
  const query = `UPDATE trabajos SET cliente = ?, descripcion = ?, empleados_asignados = ?, diagnostico = ?, marca = ?, modelo = ?, numero_serie = ? WHERE id = ?`;
  
  connection.query(query, [cliente, descripcion, empleados_asignados, diagnostico, marca, modelo, numero_serie, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Trabajo actualizado' });
  });
});



//Endpoints de proveedores
app.post('/saveProveedores', (req, res) =>{
    const {nombre, marcas_surtidas, tiempo_entrega, ubicacion, contacto, banco, cuenta_bancaria, clabe_interbancaria} = req.body;
    const sql = `INSERT INTO Proveedores (nombre, marcas_surtidas, tiempo_entrega, ubicacion, contacto, banco, cuenta_bancaria, clabe_interbancaria)
    VALUES(?,?,?,?,?,?,?,?)`;
    connection.query(sql, [nombre, marcas_surtidas, tiempo_entrega, ubicacion, contacto, banco, cuenta_bancaria, clabe_interbancaria], (err, result) => {
        if(err){
            return res.status(500).json({mensaje: 'Error al insertar datos'});
        }
        console.log("Datos registrados de manera correcta");
        res.status(201).json({
            mensaje: "registro exitoso",
            idGenerado: result.insertId
        })
    });
});

app.get('/proveedores', (req, res) => {
    const sql = 'SELECT * FROM Proveedores';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener datos' });
        }
        res.status(200).json(results);
    });   
});

app.get('/getAllProveedores',(req,res)=>{
    const sql = 'SELECT*FROM Proveedores';
    connection.query(sql,(err, response)=>{
        if (err) {
            return res.status(500).json({mensaje:'Error al consultar la base de datos'});
        }
        res.status(200).json(response);
    });
});

app.get('/getProveedores/:filtro',(req,res)=>{
    const sql = 'SELECT*FROM Proveedores WHERE id = ? OR marcas_surtidas LIKE ?';
    const {filtro} = req.params;

    connection.query(sql,[filtro,'%'+filtro+'%'],(err,result)=>{
        if (err) {
            return res.status(500).json({mensaje:'Error al consultar la base de datos'})
        }
        if (result.length ==0) {
            return res.status(200).json({mensaje:'Sin coincidencias'})
        }
        res.status(200).json(result)
    })
});



app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`)
});

