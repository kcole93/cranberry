import isValidZoteroURI from './src/utils/isValidZoteroURI'

export const config = {
  matcher: ['/']
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const uriParam = url.searchParams.get('uri');

  if (!uriParam) {
    return null;
  }

  if (isValidZoteroURI(uriParam)) {
    try {
      return Response.redirect(uriParam, 302);
    } catch (error) {
      console.error('Redirection error:', error);
      return await handleError(url, 'Failed to redirect.');
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

