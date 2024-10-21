import { createServer } from 'http';
import { join } from 'path';
import { mkdirSync, unlinkSync } from 'fs';
import https from 'https'

// create the socket path
const socketPath = join('/tmp', 'my-unix-socket.sock');

// Remove the socket file if it already exists
try {
    unlinkSync(socketPath);
} catch (err) {
    if (err.code !== 'ENOENT') throw err;
}

// Create the server
const server = createServer((req, res) => {
    console.log(`requesting ${req.url}`)
    const options = {
        hostname: req.headers.host,
        path: req.url,
        method: 'GET'
    }

    const proxyReq = https.request(options, (proxyRes) => {
        // Forward the response headers back to the client
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        // Pipe the data from the proxied response to the original response
        proxyRes.pipe(res)
    })

    req.pipe(proxyReq)
});

// Handle errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('Socket already in use');
    } else {
        console.error('Server error:', err);
    }
});

// Ensure the /tmp directory exists
mkdirSync('/tmp', { recursive: true });

server.listen(socketPath, () => {
    console.log(`Server listening on Unix domain socket: ${socketPath}`);
});
