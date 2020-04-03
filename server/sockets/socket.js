const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketontrol = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket',(data,callback) => {
        let siguiente = ticketontrol.siguiente();
        console.log(siguiente);
        callback(siguiente);
    } );

    client.emit('estadoActual',{
        actual: ticketontrol.getUltimoTocket(),
        ultimos4: ticketontrol.getUltimos4()
    });


    client.on('atenderTicket',(data,callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketontrol.atenderTicket(data.escritorio);

        callback(atenderTicket);
        // actualizar los cambios de los ultimos 4
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketontrol.getUltimos4()
        })
    })
});