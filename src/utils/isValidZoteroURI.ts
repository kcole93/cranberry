export default function isValidZoteroURI(uri: string): boolean {
  const scheme = uri.split(':')[0].toLowerCase()

  // Reject unless the protocol uses zotero's scheme
  if (['zotero'].includes(scheme)) {
    return true
  }
    return false
}
