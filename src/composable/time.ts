export function formatTimeToLocale(input?: string): string {
  if (!input) {
    return 'N/A'
  }
  return (new Date(input)).toLocaleString()
}
