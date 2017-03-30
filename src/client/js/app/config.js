// eslint-disable-next-line no-unused-vars
export function logException(ex, context) {
  // eslint-disable-next-line no-console
  typeof console === 'object' && console.error && console.error(ex);
}
