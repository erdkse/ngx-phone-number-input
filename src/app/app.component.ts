import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public formControl: FormControl;
  public values = [];

  ngOnInit() {
    this.formControl = new FormControl({
      value: null,
      disabled: false
    });

    if (this.formControl.value) {
      this.values = Object.keys(this.formControl.value);
    }

    this.formControl.valueChanges.subscribe(value => {
      if (value) {
        this.values = Object.keys(value);
      }
    });
  }

  disable() {
    this.formControl.disable();
  }
  enable() {
    this.formControl.enable();
  }
}
