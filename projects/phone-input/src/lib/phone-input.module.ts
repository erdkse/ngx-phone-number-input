import { NgModule } from '@angular/core';
import { PhoneInputComponent } from './phone-input.component';
import { CommonModule } from '@angular/common';
import { CountrySelectorComponent } from './country-selector/country-selector.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PhoneInputComponent, CountrySelectorComponent],
  exports: [PhoneInputComponent]
})
export class PhoneInputModule {}
