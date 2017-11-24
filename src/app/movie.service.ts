import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getMovieById(id) {
    return this.http.get(`http://localhost:5000/film/${id}`)
      .toPromise();
  }

  public getMovies() {
    return this.http.get(
      this.authService.site('films')
    )
    .toPromise();
  }


  public searchMovies(searchString) {
    return this.http.get(
      this.authService.site(`search/${searchString}`)
    )
      .toPromise();
  }
}
