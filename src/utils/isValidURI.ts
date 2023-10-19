export default function isValidURI(uri: string): boolean {
  const scheme = uri.split(':')[0].toLowerCase()

  // Reject if it's a standard URL scheme
  if (['http', 'https', 'ftp', 'ws', 'wss'].includes(scheme)) {
    return false
  }

    try {
        new URL(uri);
        return true;
    } catch (e) {
        return false;
    }
}
