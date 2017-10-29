import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getFilms() {
    return this.http.get(
      this.authService.site('films'),
      this.authService.createAuthHeader()
    );
  }

  getFilm(index) {
    return this.http.get(
      this.authService.site(`film/${index}`),
      this.authService.createAuthHeader()
    );
  }
}
