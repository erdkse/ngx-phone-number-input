import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  HostListener,
  ElementRef,
  forwardRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountryCallingCode
} from 'libphonenumber-js';
import { COUNTRY_CODES } from './data';
import { countries, countriesIso } from './phoneCodeCountries';
// import examples from 'libphonenumber-js/examples.mobile.json';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngx-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneInputComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  public countryCodes: Array<string> = COUNTRY_CODES;
  public selectedCountry;
  public phoneNumber = '';
  @ViewChild('menu')
  menu;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (
      !this.elementRef.nativeElement.contains(targetElement) &&
      this.menu.nativeElement.classList.contains('show')
    ) {
      this.renderer.removeClass(this.menu.nativeElement, 'show');
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  pickCountry(country) {
    this.selectedCountry = country;
    this.phoneNumberChanged(this.phoneNumber);
    this.closeMenu();
  }

  toggleMenu() {
    if (this.menu.nativeElement.classList.contains('show')) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  closeMenu() {
    this.renderer.removeClass(this.menu.nativeElement, 'show');
  }

  openMenu() {
    this.renderer.addClass(this.menu.nativeElement, 'show');
  }

  isCountrySelected(country): boolean {
    return country === this.selectedCountry;
  }

  getCountryCallingCode(country) {
    return getCountryCallingCode(country.toUpperCase());
  }

  phoneNumberChanged(number: string) {
    if (this.selectedCountry) {
      const asYouType = new AsYouType(this.selectedCountry.toUpperCase());
      this.phoneNumber = asYouType.input(number);
    }
  }
}
