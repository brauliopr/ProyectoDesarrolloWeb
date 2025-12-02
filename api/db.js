const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tallerDB'
    }
);

connection.connect((err) =>{
    if(err){
        console.log('Error concectando a MySql: ', err);
        return;
    }
    console.log('Conexion exitosa a MySql');
});

module.exports = connection;