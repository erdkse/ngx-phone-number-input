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
      value: {
        phoneNumber: null,
        dialCode: '90'
      },
      disabled: false
    });

    this.values = Object.keys(this.formControl.value);

    this.formControl.valueChanges.subscribe(value => {
      this.values = Object.keys(value);
    });
  }
}
