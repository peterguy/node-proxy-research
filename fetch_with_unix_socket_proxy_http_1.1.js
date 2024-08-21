import http from 'http'
import { URL } from 'url'

function createHttpRequest(url, socketPath) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url)

        const options = {
            socketPath,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                'Host': parsedUrl.hostname,
                'Connection': 'close',
            },
        }

        const req = http.request(options, (res) => {
            let responseData = ''

            res.on('data', (chunk) => {
                responseData += chunk
            })

            res.on('end', () => {
                resolve(responseData)
            })
        })

        req.on('error', (err) => {
            reject(err)
        })

        req.end()
    })
}

async function fetchData(url, socketPath) {
    try {
        const data = await createHttpRequest(url, socketPath)
        console.log('Response Data:', data)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

// For a simple test, create the socket using `socat` (`brew install socat` if you don't have it)
// socat unix-listen:/tmp/https-proxy.sock,fork openssl:sourcegraph.com:443,verify=0
const socketPath = '/tmp/https-proxy.sock' 

// the only destination URLs supported when proxying to dotcom are dotcom URLs.
// Use any other domain in the URL and you get 403s from CloudFlare.
const url = 'https://sourcegraph.com/search'

fetchData(url, socketPath)
