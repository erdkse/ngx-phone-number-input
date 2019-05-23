# NgxPhoneInput


![npm](https://img.shields.io/npm/dm/ngx-phone-number-input.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/erdkse/ngx-phone-number-input.svg)](https://greenkeeper.io/)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/ngx-phone-number-input.svg) 
![NpmLicense](https://img.shields.io/npm/l/ngx-phone-number-input.svg) 
![Libraries.io SourceRank](https://img.shields.io/librariesio/sourcerank/npm/ngx-phone-number-input.svg) 


## Getting started
### Step 1: Install:

#### NPM
```shell
npm install --save ngx-phone-number-input
```
#### YARN
```shell
yarn add ngx-phone-number-input
```
### Step 2: Import the NgSelectModule and angular FormsModule module:
```js
import { NgxPhoneNumberInputModule } from 'ngx-phone-number-input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxPhoneNumberInputModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
