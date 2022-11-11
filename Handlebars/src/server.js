const express = require('express')
const app = express();
const handlebars = require('express-handlebars')

app.listen(8080,()=>{
console.log("server")
})

//espacio public del servidor
app.use(express.static(__dirname +"/public"));

//
// app.engine(
//  "hbs",
//  handlebars({
//     extname:'.hbs',
//     defaultLayout :'index.hbs',
//     layoutsDir: __dirname + '/vista/layouts',
//     partialsDir:__dirname + '/vista/partials/'
//  })
// );

//establece el motor de planillas que se utiliza
app.set("view engine", "hbs");
//establece direcctorio donde se encuentra los archivos
app.set("views", "./vista");
