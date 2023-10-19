import type { Config, Context } from 'https://edge.netlify.com'
import isValidURI from '../../src/utils/isValidURI'

async function fetchHTMLResponse(
  req: Request,
  uri: string | null
): Promise<Response> {
  const newUrl = new URL('/index.html', req.url)
  if (uri) {
    newUrl.searchParams.set('uri', uri)
  }
  const res = await fetch(newUrl)
  const text = await res.text()
  return new Response(text, res)
}

export default async (req: Request, context: Context) => {
  const url = new URL(req.url)
  const uri = url.searchParams.get('uri')
  console.log(uri)

  if (!uri) {
    return fetchHTMLResponse(req, null)
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

export const config: Config = {
  path: '/'
}
