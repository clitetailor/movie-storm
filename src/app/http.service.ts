import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class HttpService {

  private site = 'http://127.0.0.1:5000';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public getPath(path) {
    return [this.site, ...path.split('/')].join('/');
  }

  public base64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt('0x' + p1, 16));
      }));
  }

  public get(path) {
    const headers = this.auth.addAuth(
      this.createHeaders
    );

    return this.http.get(
      this.getPath(path),
      { headers }
    );
  }

  public post(path, data) {
    const headers = this.auth.addAuth(
      this.createHeaders
    );

    return this.http.post(
      this.getPath(path),
      data,
      { headers }
    );
  }

  private createHeaders() {
    return new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.site)
      .set('Content-Type', 'application/json');
  }
}
