import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.styl']
})
export class HomePageComponent implements OnInit {

  private movies = Array.from({ length: 8 }, (k, v) => k);

  private _searchFocus = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getFilms();
  }

  private searchFocus() {
    this._searchFocus = true;
  }

  private searchBlur() {
    this._searchFocus = false;
  }

  public navigateToMovie(i) {
    this.router.navigate(['movie', i]);
  }
}
