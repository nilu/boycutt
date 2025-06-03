export default {
  async fetch(request: Request): Promise<Response> {
    if (new URL(request.url).pathname === '/lists.json') {
      return new Response(
        JSON.stringify([
          {
            id: 'example',
            name: 'Example List',
            urlPatterns: ['*://example.com/*'],
            tags: ['demo'],
            source: 'demo',
            updated: new Date().toISOString(),
          },
        ]),
        { headers: { 'Content-Type': 'application/json' } },
      )
    }
    return new Response('Not found', { status: 404 })
  },
}
