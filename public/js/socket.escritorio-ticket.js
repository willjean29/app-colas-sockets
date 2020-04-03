var socket = io();
var serchParams = new URLSearchParams(window.location.search);
socket.on('connect',function(){
    console.log('Conectado al servidor')
});

socket.on('disconnect',function(){
    console.log('Se perdio la conexion al servirdor');
});

if(!serchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error ('El escritorio es necesario');
}

let escritorio = serchParams.get('escritorio');
let label = $('small');
console.log(escritorio); 
$('h1').text('Escritorio '+escritorio);

$('button').on('click', function () {
    console.log('Hiciste click');
    socket.emit('atenderTicket',{
        escritorio: escritorio
    },function(resp){
        if(resp == 'No hay mas tickets'){
            label.text(resp);
            return alert(resp)
        }
        // var audio = new Audio();
        // audio.src = 'audio/new-ticket.mp3';
        // audio.play();
        label.text('Ticket '+resp.numero);
    })
});