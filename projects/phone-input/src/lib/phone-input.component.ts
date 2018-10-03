import { Component, OnInit, ViewChild, Renderer2, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-phone-input',
  templateUrl: './phone-input.component.html',
  styles: []
})
export class PhoneInputComponent implements OnInit {

  @ViewChild('menu') menu;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.menu.nativeElement.classList.contains('show')) {

        this.renderer.removeClass(this.menu.nativeElement, 'show');
      }
    }


  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  toggleMenu() {
    if (this.menu.nativeElement.classList.contains('show')) {
      this.renderer.removeClass(this.menu.nativeElement, 'show');
    } else {
      this.renderer.addClass(this.menu.nativeElement, 'show');
    }
  }

}
