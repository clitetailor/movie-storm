import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';
import { SelectInputComponent } from './select-input/select-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [InputWrapperComponent, SelectInputComponent],
  exports: [InputWrapperComponent, SelectInputComponent]
})
export class CommonDesignModule { }
