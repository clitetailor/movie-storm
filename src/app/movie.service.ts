import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {

  private _movies;
  private _movie;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get movie() {
    return this._movie;
  }

  public get movies() {
    return this._movies || Array.from({ length: 6 });
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
      });
  }

  getFilm(index) {
    this._movie = undefined;
    const movie = this._movies.find(_movie => _movie.id === index);

    if (!movie) {
      return this.http.get(
        this.authService.site(`film/${index}`),
        this.authService.createAuthHeader()
      )
        .toPromise()
        .then(film => {
          this._movie = film;
        });
    } else {
      this._movie = movie;
    }
  }
}
