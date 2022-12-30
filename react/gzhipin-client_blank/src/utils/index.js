export function getRedirectTo(type, header) {
  let path
  if (type === 'laoban') {
    path = '/laoban'
  } else {
    path = '/dashen'
  }
  if (!header) {
    path += 'info'
  }
  return path
}
