import * as parseCookie from 'cookie'

export function getToken (headers) {
  let token
  if (headers.cookie) {
    token = parseCookie.parse(headers.cookie).FRI_API
  }

  if (headers.authorization) {
    const parts = headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }

  return token
}
