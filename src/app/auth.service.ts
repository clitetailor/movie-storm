import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  private _site = 'http://127.0.0.1:5000';
  private _username: String;

  constructor(private http: HttpClient) { }

  public site(path) {
    return [
      this._site,
      ...path.split('/')
    ].join('/');
  }

  public get username() {
    return this._username;
  }

  checkAuth() {
    const token = localStorage.getItem('auth-token');
    if (token && token !== 'null' && token !== 'undefined') {
      const data = JSON.parse(token);
      this._username = data['username'];
    }
  }

  login(username, password) {
    const data = JSON.stringify({
      username: username,
      password: password
    });

    console.log(data);

    return this.http.post(
      this.site('login'),
      data,
      this.createAuthHeader()
    )
      .toPromise()
      .then(token => {
        localStorage.setItem('auth-token', JSON.stringify(token));
        console.log(token);
        this._username = username;
      });
  }

  logout() {
    localStorage.setItem('auth-token', undefined);
    this._username = undefined;
  }

  signup(username, password, userInfo) {
    const data = JSON.stringify({
      username: username,
      password: password,
      age: userInfo.age,
      gender: userInfo.gender
    });

    return this.http.post(
      this.site('signup'),
      data,
      this.createAuthHeader()
    )
      .toPromise()
      .then(_data => {
        console.log(_data);
      });
  }

  createAuthHeader() {
    const token = localStorage.getItem('auth-token');

    if (token && token !== null) {
      return {
        headers: new HttpHeaders().set('Authorization', this.encodeBase64Unicode(token))
          .set('Access-Control-Allow-Origin', this._site)
          .set('Content-Type', 'application/json')
      };
    }
    return {
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this._site)
        .set('Content-Type', 'application/json')
    };
  }

  encodeBase64Unicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt('0x' + p1, 16));
      }));
  }
}
