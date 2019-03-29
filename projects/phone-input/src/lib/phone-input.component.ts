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
  SimpleChanges,
  Input
} from '@angular/core';
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountryCallingCode
} from 'libphonenumber-js';
import { countries, countriesIso } from './phoneCodeCountries';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import examples from 'libphonenumber-js/examples.mobile.json';

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
  @Input() disabled = false;
  @Input() defaultCountry;
  @Input() placeholderText = 'Exp';
  public countries: Array<any> = countries;
  public examples = <any>examples;
  public selectedCountry;
  public phoneNumber = '';
  public selectedCountryIndex = 0;
  public tempSelectedCountryIndex = 0;
  public itemHeight = 32;
  public isCountrySelectionFocused = false;
  public isMenuOpen = false;

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

  ngOnInit() {
    if (this.defaultCountry) {
      const selectedCountry = this.countries.find(
        c => c.iso2 === this.defaultCountry
      );
      this.pickCountry(selectedCountry ? selectedCountry : this.countries[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  pickCountry(country) {
    this.selectedCountry = country;
    this.selectedCountryIndex = this.countries.findIndex(
      c => c.iso2 === this.selectedCountry.iso2
    );
    this.tempSelectedCountryIndex = this.selectedCountryIndex;
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

  onCountrySelectionButtonClicked() {
    if (
      !this.menu.nativeElement.classList.contains('show') &&
      this.isCountrySelectionFocused
    ) {
      this.openMenu();
    }
  }

  onFocused() {
    this.openMenu();
    this.isCountrySelectionFocused = true;
  }

  onBlured(event) {
    if (
      event.type === 'blur' &&
      this.menu.nativeElement.contains(event.target)
    ) {
      this.closeMenu();
      this.isCountrySelectionFocused = false;
    }

    if (
      event.type === 'keydown' &&
      (event.keyCode === 9 || event.keyCode === 27)
    ) {
      this.closeMenu();
      this.isCountrySelectionFocused = false;
    }
  }

  keyboardNav(e) {
    const code = e.keyCode;
    if (this.menu.nativeElement.classList.contains('show')) {
      if (code === 40 || code === 38) {
        this.tempSelectedCountryIndex =
          code === 40
            ? this.tempSelectedCountryIndex + 1
            : this.tempSelectedCountryIndex - 1;

        if (
          this.tempSelectedCountryIndex === -1 ||
          this.tempSelectedCountryIndex >= this.countries.length
        ) {
          this.tempSelectedCountryIndex =
            this.tempSelectedCountryIndex === -1
              ? this.countries.length - 1
              : 0;
        }

        this.renderer.setProperty(
          this.menu.nativeElement,
          'scrollTop',
          this.tempSelectedCountryIndex * this.itemHeight - this.itemHeight * 3
        );
      } else if (code === 13) {
        this.pickCountry(this.countries[this.tempSelectedCountryIndex]);
        e.preventDefault();
      } else if (code === 27 || code === 9) {
        this.onBlured(e);
      } else {
        //search countries
      }
    } else {
      if (this.isCountrySelectionFocused && code === 13) {
        this.openMenu();
      }
    }
  }

  closeMenu() {
    this.renderer.removeClass(this.menu.nativeElement, 'show');
  }

  openMenu() {
    this.renderer.addClass(this.menu.nativeElement, 'show');
    this.renderer.setProperty(
      this.menu.nativeElement,
      'scrollTop',
      this.tempSelectedCountryIndex * this.itemHeight - this.itemHeight * 3
    );
  }

  isCountrySelected(country): boolean {
    if (!this.selectedCountry) {
      return false;
    }
    return country.iso2 === this.selectedCountry.iso2;
  }

  getCountryCallingCode(country) {
    return getCountryCallingCode(country.iso2.toUpperCase());
  }

  phoneNumberChanged(number: string) {
    const asYouType = new AsYouType(this.selectedCountry.iso2.toUpperCase());
    this.phoneNumber = asYouType.input(number);
    console.log(this.phoneNumber);
  }

  getAsYouTyped(number) {
    const asYouType = new AsYouType(this.selectedCountry.iso2.toUpperCase());
    return asYouType.input(number);
  }

  getParsePhoneNumberFromString({ phoneNumber, countryCode }) {
    const parsing =
      phoneNumber && countryCode
        ? parsePhoneNumberFromString(phoneNumber, countryCode)
        : null;
    return {
      phoneNumber: phoneNumber ? phoneNumber : null,
      countryCode: countryCode,
      isValid: false,
      ...(parsing
        ? {
            formattedNumber: parsing.number,
            nationalNumber: parsing.nationalNumber,
            isValid: parsing.isValid(),
            type: parsing.getType(),
            formatInternational: parsing.formatInternational(),
            formatNational: parsing.formatNational(),
            uri: parsing.getURI(),
            e164: parsing.format('E.164')
          }
        : null)
    };
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
