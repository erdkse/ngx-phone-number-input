import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'ngx-phone-input',
  templateUrl: './phone-input.component.html',
  styles: []
})
export class PhoneInputComponent implements OnInit {

  @ViewChild('menu') menu;

  constructor(private renderer: Renderer2) { }

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
