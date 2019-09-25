
export class UserModel {

  constructor(public email: string, public id: string,
              private _token: string, private _tokenExpirationDate: Date) {}

  get token() {
    if ( !this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      // the token is expired
      return null ;
    }
    return this._token;
  }
}
