import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(username, password) {
    const data = JSON.stringify({
      username, password
    });

    return this.http.post('localhost:5000/signup', data)
      .toPromise()
      .then(token => {
        console.log(token);
      });
  }
}
