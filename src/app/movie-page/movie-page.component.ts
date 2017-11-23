import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.styl']
})
export class MoviePageComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    private movieService: MovieService
  ) { }

  get movies() {
    return Array.from({ length: 3 });
  }

  get movie() {
    return this.movieService.movie;
  }

  ngOnInit() {
    this.movieService.getFilms();
  }

  private navigateBack() {
    this.location.back();
  }

  private navigateToMovie(i) {
    this.router.navigate(['movie', i]);
  }
}
