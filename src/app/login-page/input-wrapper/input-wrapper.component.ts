import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.styl']
})
export class InputWrapperComponent implements OnInit {

  @Input('placeholder') placeholder: String;

  private _focus = false;

  constructor() { }

  ngOnInit() {
  }

  focus() {
    this._focus = true;
  }

  blur() {
    this._focus = false;
  }
}
