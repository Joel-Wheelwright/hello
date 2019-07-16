const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({ path: './variables.env'})

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', function(error){
    console.log('Error de mongoose:', error);
});

require('./Schemas/Persona');
const modeloPersona = mongoose.model('Persona');

const app = express();

app.use(bodyParser());

app.get('/', function(req, res){
    res.send("hola");
});

app.get('/hello', function(req, res){
    res.send('Hello my name is Jeff');
});

app.get('/nueva-persona', function(req, res){

    const miPersona = new modeloPersona({
        name: req.query.name,
        email:req.query.email,
        username: req.query.username,
        password: req.query.password,
        age: req.query.age
    });
    miPersona.save().then(function(){
        res.send('Persona guardada');
    });
});

app.get('/personas/joel', function(req, res){
    console.log(req.query.username);
    const search = {
        username: req.query.username
    };
    modeloPersona.find(search).then(function(users){
        res.send(users);
    });
});

app.listen(process.env.PORT, function(){
    console.log('Aplicacion escuchando en http://localhost:3000');
});
