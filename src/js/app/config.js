// eslint-disable-next-line no-unused-vars
export function logException(ex, context) {
  // eslint-disable-next-line no-console
  window && window.console && console.error && console.error(ex);
}
