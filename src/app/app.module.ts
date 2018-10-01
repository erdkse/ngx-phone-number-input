import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhoneInputModule } from 'projects/phone-input/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhoneInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
