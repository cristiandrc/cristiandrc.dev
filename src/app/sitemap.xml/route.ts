
export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin
  const routes = ['/', '/project']

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes
      .map((route) => `  <url><loc>${baseUrl}${route}</loc></url>`) 
      .join('\n') +
    '\n</urlset>'

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
