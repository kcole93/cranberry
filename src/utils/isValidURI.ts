export default function isValidURI(uri: string): boolean {
  const scheme = uri.split(':')[0].toLowerCase()

  // Reject if it's a standard URL scheme
  if (['http', 'https', 'ftp', 'ws', 'wss'].includes(scheme)) {
    return false
  }

  // Use a regex to check general URI format
  const regex = /^(?:[a-z][a-z\d+.-]*):(?:\/{1,3}|[a-z0-9%])/i
  return regex.test(uri)
}
