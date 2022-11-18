console.log("helooo")
const socketCliente = io();

// enviar productores desde socket 
const productsForm =  document.getElementById("productosForm");
productsForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const product ={
     title: document.getElementById("title").value,
     price: document.getElementById("price").value,
     imagen: document.getElementById("imagen").value
  }
   console.log(product)
   socketCliente.emit("newProductos",product)
})

const productosContainer = document.getElementById("productosContainer")
//recibir los productos y mostrar tabla
socketCliente.on("listProdutosFront",async(data)=>{
 console.log(data);
 const containerProductos = await fetch("./templates/table.handlebars")
 const templatesForm = await containerProductos.text();
 //Conectar
 const template =Handlebars.compile(templatesForm);
 console.log(template)
 //link datos al  ir datos table.handlebars
 const html = template({productos: data})
 console.log(html)
 // enviarlo al frontend server  home.handlebars <div id="productosContainer">
 itemForm.innerHTML = html;
})