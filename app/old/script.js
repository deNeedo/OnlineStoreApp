document.body.style.backgroundColor = "#FF0000";

let socket;

function login()
{
    socket = new WebSocket("ws://localhost:80");
    socket.onmessage = function(event)
    {
        console.log("${event.data}");
    };
    // socket.close(1000, "client_close");
}
    // socket.onopen = function(e)
    // {
    //     console.log("Connection established");
    //     socket.send("client login try\n");
    // };
   
    // socket.connect('localhost:888');

    // // Add a connect listener
    // socket.on('connect',function()
    // {
    //     console.log('Client has connected to the server!');
    // });
    // // Add a connect listener
    // socket.on('message',function(data)
    // {
    //     console.log('Received a message from the server!',data);
    // });
    // // Add a disconnect listener
    // socket.on('disconnect',function()
    // {
    //     console.log('The client has disconnected!');
    // });


// Sends a message to the server via sockets
// function sendMessageToServer(message)
// {
//     socket.send(message);
// };