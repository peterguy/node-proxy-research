import { connect } from 'net';
import { join } from 'path';

const socketPath = join('/tmp', 'my-unix-socket.sock');

// Connect to the Unix domain socket
const client = connect(socketPath, () => {
    console.log('Connected to Unix domain socket server');

    // Send a message to the server
    client.write('Hello from client!');
});

// Handle data received from the server
client.on('data', (data) => {
    console.log('Received data from server:', data.toString());
});

// Handle errors
client.on('error', (err) => {
    console.error('Client error:', err);
});

// Handle connection close
client.on('close', () => {
    console.log('Connection closed');
});

client.read()
