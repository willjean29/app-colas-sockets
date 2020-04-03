var socket = io();

socket.on('connect',function(){
    console.log('Conectado al servidor')
});

socket.on('disconnect',function(){
    console.log('Se perdio la conexion al servirdor');
});

let lblticket1 = $('#lblTicket1');
let lblticket2 = $('#lblTicket2');
let lblticket3 = $('#lblTicket3');
let lblticket4 = $('#lblTicket4');

let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

let lbltickets = [lblticket1,lblticket2,lblticket3,lblticket4];
let lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];


socket.on('estadoActual',function(data){
    actualizarHTML(data.ultimos4);
})

socket.on('ultimos4',function(data) {
    console.log('actualizando');
    var audio = new Audio();
    audio.src = 'audio/new-ticket.mp3';
    audio.play();
    actualizarHTML(data.ultimos4);
})

function actualizarHTML(ultimos4){
    for (let i = 0; i < ultimos4.length; i++) {
        lbltickets[i].text('Ticket '+ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio '+ ultimos4[i].escritorio);    
    }
}