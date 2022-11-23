console.log("js funcionando");

//inicializar socket al lado del cliente 
const socketClient = io();


socketClient.on("msgChat",(data)=>{
    console.log(data)
    let messages="";
    data.forEach(element => {
        messages += `<p>Nombre: ${element.autor} - MENSAJE: ${element.text}</p>`
    });
    chatContainer.innerHTML = messages;
})

// //capturar el nombre del usuario
let user = "";
Swal.fire({
    title:"Bienvenido",
    text:"Ingresa tu nombre de usuario",
    input:"text",
    allowOutsideClick: false
}).then(response=>{
    console.log(response)
    user = response.value;
    document.getElementById("username").innerHTML = `Bienvenido ${user}`;
})

// //enviar un mensaje a nuestro servidor
const chatForm = document.getElementById("chatForm");

chatForm.addEventListener("submit",(event)=>{
    //prevenir que se recarge la pagina cuando se envia el formulario
    event.preventDefault();
    console.log("formulario enviado")
    const message = {
        author:user,
        text:document.getElementById("addMsg").value
    }
    console.log(message)
    //envia nuevo mensaje
    socketClient.emit("newMsg", message)
})