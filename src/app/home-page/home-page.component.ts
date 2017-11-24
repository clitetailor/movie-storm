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
  private regex = /\((.*)\)/;

  private movies: any[] = Array.from({ length: 6 }, () => {
    return {
      id: -1,
      image_url: ''
    };
  });

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getMovies()
      .then((movies: any[]) => {
        this.ngZone.run(() => {
          this.movies.forEach((movie, i) => {
            Object.assign(movie, movies[i]);
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  private searchFocus() {
    this._searchFocus = true;
  }

  private searchBlur() {
    this._searchFocus = false;
  }

  public navigateToMovie(i) {
    if (i > 0) {
      this.router.navigate(['movie', i]);
    }
  }
}
