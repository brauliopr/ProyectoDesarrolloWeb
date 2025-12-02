create database tallerDB;

use tallerDB;

create table Piezas (
	id Int not null primary key auto_increment,
    numero_parte varchar(30) not null,
	descripcion varchar(100),
    cantidad int
);

insert into Piezas (numero_parte, descripcion, cantidad) Values ("P554004", "Filtro de aceite standard", 3);

select * from Piezas;

create table Trabajos (
	id Int not null primary key auto_increment,
    cliente varchar (100) not null,
    descripcion varchar (100),
    empleados_asignados varchar(100),
    diagnostico varchar(350),
    marca varchar (20),
    modelo varchar (50),
    numero_serie varchar(20)
);

select*from Trabajos;

create table Proveedores (
	id Int not null primary key auto_increment,
	nombre varchar(50),
    marcas_surtidas varchar (150),
    tiempo_entrega varchar (30),
    ubicacion varchar (100),
    contacto varchar (20),
	banco VARCHAR(100),
    cuenta_bancaria VARCHAR(50),
    clabe_interbancaria VARCHAR(18)
);