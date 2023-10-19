import isValidURI from './src/utils/isValidURI'

export const config = {
  matcher: '/'
}

async function fetchHTMLResponse(req, uri) {
  try {
    const newUrl = new URL('/index.html', req.url)
    if (uri) {
      newUrl.searchParams.set('uri', uri)
    }
    const res = await fetch(newUrl)
    const text = await res.text()
    return new Response(text, { headers: res.headers })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}

export default async function middleware(req) {
  const url = new URL(req.url)
  const uri = url.searchParams.get('uri')

  if (!uri) {
    return await fetchHTMLResponse(req, null)
  }

  if (isValidURI(uri)) {
    return Response.redirect(uri, 302)
  }

  const fetchResponse = await fetchHTMLResponse(req, uri)

  return new Response(fetchResponse.body, {
    status: 400,
    headers: {
      'Content-Type': 'text/html'
    }
  })
}
