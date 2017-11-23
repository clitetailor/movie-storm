import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.styl']
})
export class HomePageComponent implements OnInit {

  private _searchFocus = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private movieService: MovieService
  ) { }

  get movies() {
    return this.movieService.movies;
  }

  ngOnInit() {
    // this.movieService.getFilms()
    //   .then(() => {
    //     this.ngZone.run(() => {
    //       console.log('!');
    //     });
    //   });
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
