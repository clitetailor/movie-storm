import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.styl']
})
export class HomePageComponent implements OnInit {

  private _searchFocus = false;

  private movies: any[] = Array.from({ length: 6 }, () => {
    return {
      id: -1,
      image_url: ''
    };
  });

  @ViewChild('searchInput') searchInput;

  private inputDebounceSubscription: Subject<string> = new Subject();
  private searchSubscription: Subject<string> = new Subject();
  private suggestions = [];
  private searchString = '';

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private movieService: MovieService,
    private searchService: SearchService
  ) { }

  public ngOnInit() {
    this.getMovies();

    this.bindSuggestions();
    this.bindSearch();
  }

  private search(rawString) {
    if (rawString && rawString !== '') {
      this.searchString = '';
      this.searchInput.nativeElement.blur();
      this.searchSubscription.next(rawString);
    }
  }

  private getMovies() {
    this.movieService.getMovies()
      .then((movies: any[]) => {
        this.movies.forEach((movie, i) => {
          Object.assign(movie, movies[i]);
        });

        console.log(movies);
      })
      .catch(err => {
        console.error(err);
      });
  }

  private onSearchInput(value) {
    this.inputDebounceSubscription.next(value);
  }

  private bindSuggestions() {
    this.inputDebounceSubscription
      .debounceTime(400)
      .mergeMap(raw => this.searchService.suggest(raw))
      .subscribe((suggestions: any[]) => {
        this.suggestions = suggestions;
      }, err => {
        return new Subject();
      });
  }

  private bindSearch() {
    this.searchSubscription
      .mergeMap(raw => this.searchService.search(raw))
      .subscribe((suggestions: any[]) => {

        if (suggestions.length > 3) {
          this.movies = suggestions.slice(0, 6);
        }
      }, err => {
        return new Subject();
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

  private searchFocus() {
    this._searchFocus = true;
  }

  private searchBlur() {
    this._searchFocus = false;
  }

  public navigateToMovie(i) {
    console.log(i);

    if (i > 0) {
      this.router.navigate(['movie', i]);
    }
  }
}
