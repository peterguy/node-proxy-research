import fetch from 'node-fetch'
import http from 'http'
import https from 'https'
import { Agent as HttpAgent } from 'http'
import { Agent as HttpsAgent } from 'https'
import net from 'net'

class UnixSocketAgent extends HttpAgent {
    constructor(socketPath) {
        super({ keepAlive: true })
        this.socketPath = socketPath
    }

    // createConnection(options, callback) {
    //     // Extract the path and headers from the request options
    //     const { path, headers } = options
    //     const socket = net.connect(this.socketPath, () => {
    //         // Send the HTTP request over the socket connection
    //         const requestPath = path.replace(/http:\/\/[^\/]+/, '')
    //         const headerString = Object.entries(headers)
    //             .map(([key, value]) => `${key}: ${value}`)
    //             .join('\r\n')

    //         socket.write(`GET ${requestPath} HTTP/1.1\r\n${headerString}\r\n\r\n`)
    //         callback(null, socket)
    //     })

    //     socket.on('error', (err) => {
    //         callback(err)
    //     })

    //     return socket
    // }
}

async function fetchData(url, socketPath) {
    try {
        // Create an instance of the custom UnixSocketAgent
        const agent = new UnixSocketAgent(socketPath)

        // Choose the correct protocol
        const protocol = url.startsWith('https') ? https : http

        // Perform the fetch with the custom agent
        const response = await fetch(url, { agent })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

// Example usage
const url = 'https://sourcegraph.com/search'
const socketPath = '/tmp/https-proxy.sock'

fetchData(url, socketPath)
