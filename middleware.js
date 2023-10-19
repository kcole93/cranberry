import isValidURI from './src/utils/isValidURI'

export const config = {
  matcher: ['/']
}

export default async function middleware(req) {
  const url = new URL(req.url)
  const uri = url.searchParams.get('uri')

  if (!uri) {
    return null
  }

  if (isValidURI(uri)) {
    return Response.redirect(uri, 302)
  }

  const errorUrl = new URL('/error', url.origin)
  const errorPageResponse = await fetch(errorUrl)
  const errorPageContent = await errorPageResponse.text()

  return new Response(errorPageContent, {
    status: 400,
    headers: {
      'Content-Type': 'text/html'
    }
  })
}
