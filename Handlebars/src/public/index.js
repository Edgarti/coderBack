console.log("archivo index.js de piblic")

const template = Handlebars.compile(`
 <ul>  
   <li> {{nombre}}  </li>
   <li> {{apellido}} </li>
   <li> {{edad}} </li>
 </ul>

`);

const html = template({
  nombre: "edgar",
  apellido: "pirachican",
  edad : 25
})

console.log(html);
document.getElementById("contenedor").innerHTML = html
