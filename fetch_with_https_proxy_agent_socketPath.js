// Import the required modules
import fetch from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

// Define an async function to make an HTTPS request with proxy support
async function fetchData(url) {
    try {
        // Create a proxy agent
        const agent = new HttpsProxyAgent({protocol: 'https', socketPath: '/tmp/mitm-proxy.sock'})
        console.log(agent)
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
