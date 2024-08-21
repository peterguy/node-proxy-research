import fetch from 'node-fetch'
import { Agent } from 'agent-base'
import { connect } from 'net'

class UnixSocketAgent extends Agent {
  constructor(socketPath) {
    super()
    this.socketPath = socketPath
  }

  async connect(req, options) {
    return new Promise((resolve, reject) => {
      const socket = connect(this.socketPath)
      socket.on('connect', () => resolve(socket))
      socket.on('error', reject)
    })
  }
}

async function fetchData(url) {
  try {
    const agent = new UnixSocketAgent('/tmp/https-proxy.sock')
    const response = await fetch(url, { agent })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.text()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const url = 'https://sourcegraph.com/search'
fetchData(url)
