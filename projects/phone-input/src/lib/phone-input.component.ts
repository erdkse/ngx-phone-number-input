import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  HostListener,
  ElementRef
} from '@angular/core';
import { parsePhoneNumber, AsYouType, CountryCode } from 'libphonenumber-js';
import { COUNTRY_CODES } from './data';

@Component({
  selector: 'ngx-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {
  public countryCodes: Array<string> = COUNTRY_CODES;
  public selectedCountry;
  public phoneNumber: string;
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
    const phoneNumber = parsePhoneNumber('+905532143599');

    console.log('phoneNumber', phoneNumber);
    console.log('formatInternational', phoneNumber.formatInternational());
    console.log('formatNational', phoneNumber.formatNational());
    console.log('getURI', phoneNumber.getURI());
    console.log('CountryCode');
    console.log('asYouType', new AsYouType('TR').input('2133734'));
  }

  pickCountry(country) {
    this.selectedCountry = country;
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

  phoneNumberChanged(number: string) {
    if (this.selectedCountry) {
      this.phoneNumber = new AsYouType(this.selectedCountry).input(number);
    }
  }
}
