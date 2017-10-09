
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');     // Simula el actualizar y emininar




//Configuración
mongoose.connect('mongodb://localhost:27017/uwO3mypu')


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//Se define el modelo
var Todo = mongoose.model('Todo', {
    text: String
});


// Rutas

// API
// get de las listas
app.get('/api/todos', function (req, res) {

    // use mongoose para obtener todas las listas de la base de datos
    Todo.find(function (err, todos) {

        // en caso de que exista algun error lo notificara en consola
        if (err)
            res.send(err)

        res.json(todos); // corre todas las listas en formato JSON
    });
});

// crea listas y despues las muestra
app.post('/api/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // muestra las listas despues de ser creadas
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// elimina las listas
app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);


        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// Aplicación
app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
});





//Escucha

app.listen(8080);
console.log("App listening on port 8080");