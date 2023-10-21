# Cranberry: The cure for your URI
Cranberry provides a microservice enabling you to turn [Zotero](https://zotero.org) URIs into a standard URL like so:

https://cranberrysauce.vercel.app/?uri=YOUR_ZOTERO_URI

This URL can be used in places where URLs with non-standard protocols are invalidated, such as in-text hyperlinks in [Notion.so](https://notion.so/).

Zotero URIs can be used to open specific resources within your Zotero library or libraries. Cranberry helps you utilize these item locators in different contexts, like inserting links to Zotero resources in your notes in external applications or pointing a colleague to a specific resource via a messaging platform.

## How Does Cranberry Work?
Cranberry takes advantage of Vercel's [Edge Middleware Runtime](https://vercel.com/docs/functions/edge-middleware) to limit latency as much as possible in processing redirects. 

If a Zotero URI is provided in the incoming request, a redirect is immediately sent to the provided Zotero URI. If no URI is included in the request, the project's homepage is served. If an invalid URI is included, a 400 status message is sent and a helpful error page is displayed for human users.
