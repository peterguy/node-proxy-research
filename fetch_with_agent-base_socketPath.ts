import fetch, { Response } from 'node-fetch'
import { Agent, AgentConnectOpts } from 'agent-base'
import { connect, Socket } from 'net'

class UnixSocketAgent extends Agent {
  private socketPath: string

  constructor(socketPath: string) {
    super()
    this.socketPath = socketPath
  }

  async connect(req: any, options: AgentConnectOpts): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const socket = connect(this.socketPath)
      socket.on('connect', () => resolve(socket))
      socket.on('error', reject)
    })
  }
}

async function fetchData(url: string): Promise<void> {
  try {
    const agent = new UnixSocketAgent('/tmp/https-proxy.sock')
    const response: Response = await fetch(url, { agent })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: string = await response.text()
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const url: string = 'https://sourcegraph.com/search'
fetchData(url)