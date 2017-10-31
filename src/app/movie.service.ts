import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {

  private _movies;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public get movies() {
    return this._movies || Array.from({ length: 8 });
  }

  searchFilm(searchString) {
    this.http.get(
      this.authService.site(`search/${searchString}`),
      this.authService.createAuthHeader()
    );
  }

  getFilms() {
    return this.http.get(
      this.authService.site('films'),
      this.authService.createAuthHeader()
    )
      .toPromise()
      .then(films => {
        const movies = [];

        Object.keys(films).forEach((key) => {
          Object.keys(films[key]).forEach(i => {
            while (!movies[i]) {
              movies.push({});
            }

            movies[i][key] = films[key][i];
          });
        });

        this._movies = movies;
        console.log(movies);
      });
  }

  getFilm(index) {
    return this.http.get(
      this.authService.site(`film/${index}`),
      this.authService.createAuthHeader()
    );
  }
}
