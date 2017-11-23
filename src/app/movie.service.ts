import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {

  private _movies = Array.from({ length: 6 }, (v, k) => {
    return {
      id: -1,
      image_url: ''
    };
  });
  private _movie;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get movie() {
    return this._movie;
  }

  public get movies() {
    return this._movies;
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
      .then((films: any[]) => {
        films.forEach((film, i) => {
          Object.assign(this._movies[i], film);
        });

        console.log(this._movies, films);
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
