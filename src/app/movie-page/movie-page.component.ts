import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MovieService } from '../movie.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.styl']
})
export class MoviePageComponent implements OnInit {

  private movie: any = {
    image_url: ''
  };

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
  ) { }

  public ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    this.getMovie();
    this.getRelatedMovies();
  }

  private getId() {
    return this.route.paramMap.map(param => param.get('id'));
  }

  private getMovie() {
    this.getId().subscribe((id) => {
      this.movieService.getMovieById(id)
        .then(movie => {
          this.ngZone.run(() => {
            this.movie = movie;
          });
        })
        .catch(err => {
          console.error(err);
        });
    }, (err) => {
      console.error(err);
    });
  }

  private getMovieName(movie) {
    const matchGroup =
      movie && movie.name && movie.name.match(/\((.*)\)/);

    return movie.name
      && movie.name.substr(
        0, matchGroup ? matchGroup.index : undefined
      );
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

  private navigateBack() {
    this.location.back();
  }

  private navigateToMovie(i) {
    if (i > 0) {
      this.router.navigate(['movie', i]);
    }
  }
}
