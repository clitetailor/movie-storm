import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class SearchService {

  constructor(
    private http: HttpService
  ) { }

  public suggest(raw: String) {
    this.http.get(`suggest/${this.http.base64(raw)}`);
  }

  public search(raw: String) {
    this.http.get(`search/${this.http.base64(raw)}`);
  }
}
