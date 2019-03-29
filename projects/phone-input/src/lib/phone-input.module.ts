import { NgModule } from '@angular/core';
import { PhoneInputComponent } from './phone-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [PhoneInputComponent],
  exports: [PhoneInputComponent]
})
export class PhoneInputModule {}
