import isValidURI from './src/utils/isValidURI'

export const config = {
  matcher: ['/']
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const uriParam = url.searchParams.get('uri');

  if (!uriParam) {
    return null;
  }

  const uri = uriParam.replace(/ /g, '+');  // Replace spaces with + characters

  if (isValidURI(uri)) {
    try {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': uri
        }
      });
    } catch (error) {
      console.error('Redirection error:', error);
      return await handleError(url, 'Failed to redirect due to an invalid URI.');
    }
  }

  return await handleError(url, 'The URI provided is invalid.');
}

async function handleError(url, errorMessage) {
  const errorUrl = new URL('/error', url.origin);
  const errorPageResponse = await fetch(errorUrl);
  const errorPageContent = await errorPageResponse.text();

  return new Response(errorPageContent, {
    status: 400,
    headers: {
      'Content-Type': 'text/html',
      'X-Error-Message': errorMessage,
    },
  });
}

