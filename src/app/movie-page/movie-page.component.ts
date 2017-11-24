import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.styl']
})
export class MoviePageComponent implements OnInit {

  private movie: any = {
    image_url: ''
  };
  private routeSnapshot;

  private relatedMovies = Array.from({ length: 3 }, (v, k) => {
    return {
      id: -1,
      image_url: '',
      name: ''
    };
  });

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ngZone: NgZone
  ) {
    this.routeSnapshot = this.route.snapshot;
  }

  private get id() {
    return this.routeSnapshot.paramMap.get('id');
  }

  private getMovie() {
    this.movieService.getMovieById(this.id)
      .then(movie => {
        this.ngZone.run(() => {
          this.movie = movie;
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  private getRelatedMovies() {
    this.movieService.getMovies()
      .then(movies => {
        this.relatedMovies.forEach((movie, i) => {
          Object.assign(movie, movies[i]);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getMovie();
    this.getRelatedMovies();
  }

  private navigateBack() {
    this.location.back();
  }

  private navigateToMovie(i) {
    if (i > 0) {
      this.router.navigate(['movie', i]);
    }
  }
}
