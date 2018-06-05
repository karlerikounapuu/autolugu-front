import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      console.log(obj)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor (obj) {
    this.UserId = obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] // eslint-disable-line camelcase
    this.email = obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    // this.admin = NameIdentifier
    // this.email = email
    this.iss = obj['iss']
  }
}
