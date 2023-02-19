const socket = io()


socket.emit("mensaje", "Hola, este es mi primer mensaje con socket") //enviar info al servidor


socket.on("Mensaje general",info=>{
    console.log(info);
})
socket.on("Mensaje-socket-propio",info=>{
    console.log(info);
})