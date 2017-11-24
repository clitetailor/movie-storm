import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService implements OnInit {
  private _site = 'http://127.0.0.1:5000';
  private userId = undefined;

  constructor(private http: HttpClient) { }

  public site(path) {
    return [
      this._site,
      ...path.split('/')
    ].join('/');
  }

  ngOnInit() {
    const userId = localStorage.getItem('user-id');
    if (
      userId === undefined
      || userId === ''
      || userId === 'undefined'
    ) {
      // If there's no user id, then pass.
    } else {
      this.userId = Math.round( Number(userId) );
    }
  }

  public setUserId(id) {
    this.userId = id;
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
