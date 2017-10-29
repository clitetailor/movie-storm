import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.styl'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInputComponent),
    multi: true
  }]
})
export class SelectInputComponent implements OnInit, ControlValueAccessor {

  @Input('placeholder') placeholder: String;
  @Input('label') label: String;

  private focus;
  private value;
  private inputChange;
  private _focus = false;

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
