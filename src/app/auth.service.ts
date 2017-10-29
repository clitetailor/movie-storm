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

  login(username, password) {
    const data = JSON.stringify({
      username: username,
      password: password
    });

    return this.http.post(
      this.site('login'),
      data,
      this.createAuthHeader()
    )
      .toPromise()
      .then(token => {
        localStorage.setItem('auth-token', token.toString());

        this._username = username;
      });
  }

  logout() {
    this._username = undefined;
  }

  signup(username, password, userInfo) {
    const data = JSON.stringify({
      username: username,
      password: password,
      age: userInfo.age,
      gender: userInfo.age
    });

    console.log(this.site('signup'));

    return this.http.post(
      this.site('signup'),
      data,
      this.createAuthHeader()
    )
      .toPromise()
      .catch(err => {
        console.log(err);
      });
  }

  createAuthHeader() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      return {
        headers: new HttpHeaders().set('Authorization', token)
          .set('Access-Control-Allow-Origin', this._site)
          .set('Content-Type', 'application/json')
      };
    }
    console.log(this._site);
    return {
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this._site)
        .set('Content-Type', 'application/json')
    };
  }
}
