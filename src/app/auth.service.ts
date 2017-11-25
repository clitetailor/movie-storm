import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService implements OnInit {
  private userId = undefined;

  constructor() { }

  public ngOnInit() {
    this.checkUserId()
      .then(userId => {
        this.userId = userId;
      })
      .catch(err => {
        console.error(err);
      });
  }

  public checkUserId() {
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem('user-id');
      if (
        userId === null
        || userId === 'null'
        || userId === undefined
        || userId === ''
        || userId === 'undefined'
      ) {
        // If there's no user id, then pass.
        return reject('There\'s no user id!');
      } else {
        const userIdInt = Math.round(Number(userId));

        return resolve(userIdInt);
      }
    });
  }

  public setUserId(id) {
    localStorage.setItem('user-id', id);
    this.userId = id;
  }

  public logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('user-id');
      this.userId = -1;

      const userId = localStorage.getItem('user-id');

      resolve(userId);
    });
  }

  public addAuth(headers) {
    const userId = localStorage.getItem('user-id');

    if (
      userId && userId !== null
      && userId !== undefined
      && userId !== 'undefined'
    ) {
      return headers.set('Authorization', this.base64(userId));
    }
    return headers;
  }

  public base64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt('0x' + p1, 16));
      }));
  }
}
