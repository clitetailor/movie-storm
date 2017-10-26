import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.styl']
})
export class MoviePageComponent implements OnInit {

  private movies = [1, 2, 3];

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  private navigateBack() {
    this.location.back();
  }

  public navigateToMovie(i) {
    this.router.navigate(['movie', i]);
  }
}
