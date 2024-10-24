// Import the required modules
import fetch from 'node-fetch'
import { ProxyAgent } from 'proxy-agent'
import * as fs from 'node:fs'
import { URL } from 'url'
// import { HttpsProxyAgent } from 'https-proxy-agent'

// Define an async function to make an HTTPS request with proxy support
async function fetchData(url) {
    try {
        const uurl = new URL(url)

        const homeDir = process.env.HOME || process.env.USERPROFILE
        // Create a proxy agent
        // Requires the UDS to be set up on ~/mitm-proxy.sockm, and that the mitm CA certs are in ~/.mitmproxy
        const agent = new ProxyAgent({protocol: uurl.protocol, socketPath: `${homeDir}/mitm-proxy.sock`, ca: fs.readFileSync(`${homeDir}/.mitmproxy/mitmproxy-ca-cert.cer`)})
        // HttpsProxyAgent requires a host, otherwise there's an error because it tries to run `replace` on the host value
        // const agent = new HttpsProxyAgent({protocol: 'https', socketPath: '/tmp/https-proxy.sock'})
        //console.log(agent)
        const opts = {
            agent,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            },
            redirect: 'follow',
            follow: 2,
        }
        // Make the HTTPS request using fetch with the proxy agent
        const response = await fetch(url, opts)

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.text()

        console.log(`Fetched ${data.length} characters from ${url}`)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

for (const url of ['http://www.ghosttrack.com/', 'https://sourcegraph.com/']) {
    console.log(`Fetching ${url}`)
    await fetchData(url)
}
