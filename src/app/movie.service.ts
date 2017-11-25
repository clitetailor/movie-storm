import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class MovieService {

  constructor(
    private http: HttpService
  ) { }

  public getMovieById(id) {
    return this.http.get(`film/${id}`)
      .toPromise();
  }

  public getMovies() {
    return this.http.get('films')
      .toPromise();
  }
}
