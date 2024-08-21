// Import the required modules
import fetch from 'node-fetch'
import { ProxyAgent } from 'proxy-agent'

// Define an async function to make an HTTPS request with proxy support
async function fetchData(url, proxyUrl) {
    try {
        // Create a proxy agent
        const agent = new ProxyAgent({protocol: 'https', socketPath: '/tmp/https-proxy.sock'})
        // const agent = new HttpsProxyAgent({protocol: 'https', socketPath: '/tmp/https-proxy.sock'})

        // Make the HTTPS request using fetch with the proxy agent
        const response = await fetch(url, { agent })

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        // Parse the response as JSON
        const data = await response.text()

        // Log the received data
        console.log(data)
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error)
    }
}

const url = 'https://sourcegraph.com/search'

fetchData(url)
