// Import the required modules
import fetch from 'node-fetch'
import pkg from 'vscode-proxy-agent'

const { getProxyAgent } = pkg

// import { HttpsProxyAgent } from 'https-proxy-agent'

// Define an async function to make an HTTPS request with proxy support
async function fetchData(url) {
    try {
        const agent = getProxyAgent(url)
        // Create a proxy agent
        // const agent = new ProxyAgent({protocol: 'https', socketPath: '/tmp/mitm-proxy.sock', host: '', port: 0})
        // HttpsProxyAgent requires a host, otherwise there's an error because it tries to run `replace` on the host value
        // const agent = new HttpsProxyAgent({protocol: 'https', socketPath: '/tmp/https-proxy.sock'})
        console.log(agent)
        const opts = {
            agent,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            }
        }
        // Make the HTTPS request using fetch with the proxy agent
        const response = await fetch(url, opts)

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
