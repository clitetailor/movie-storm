import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.styl']
})
export class FrontPageComponent implements OnInit {

  private movies = Array.from({ length: 8 }, (k, v) => k);

  private _searchFocus = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private searchFocus() {
    this._searchFocus = true;
  }

  private searchBlur() {
    this._searchFocus = false;
  }

  public navigateToMovie() {
    this.router.navigate(['movie']);
  }
}
