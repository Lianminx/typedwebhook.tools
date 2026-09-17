import { handleRequest } from './index'
import ui from '../ui/.svelte-kit/cloudflare/_worker.js'

export { WebSocketStore } from './webSocketStore'

export default {
  async fetch(request: Request, env: Bindings) {
    const path = new URL(request.url).pathname
    if (path === '/new_webhook' || path.startsWith('/webhook/') || path.startsWith('/ws/')) {
      return handleRequest(request, env)
    }
    return ui.fetch(request, env)
  },
}
