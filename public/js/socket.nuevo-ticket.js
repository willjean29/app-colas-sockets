
var socket = io();
var label = $('#lblNuevoTicket');


socket.on('connect',function(){
    console.log('Conectado al servidor')
});

socket.on('disconnect',function(){
    console.log('Se perdio la conexion al servirdor');
});

$('button').on('click', function () {
    console.log('Hiciste click');
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    })
});
$(document).ready(function () {
    socket.on('estadoActual',function(data){
        console.log(data);
        label.text(data.actual);
    })
});
