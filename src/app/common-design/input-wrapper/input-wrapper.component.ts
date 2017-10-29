import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.styl'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputWrapperComponent),
    multi: true
  }]
})
export class InputWrapperComponent implements OnInit, ControlValueAccessor {

  @Input('placeholder') placeholder: String;
  @Input('type') type: String;

  private inputChange;
  private focus;
  private _focus = false;

  private value;

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(inputChange) {
    this.inputChange = inputChange;
  }

  registerOnTouched(focus) {
    this.focus = function () {
      this._focus = !this._focus;
      focus();
    };
  }

  writeValue(value) {
    this.value = value;
  }
}
