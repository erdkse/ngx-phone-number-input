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
        phoneNumber: '5532143599',
        dialCode: '237'
      },
      disabled: false
    });

    this.formControl.valueChanges.subscribe(value => {
      if (value) {
        this.values = Object.keys(value);
      }
    });
  }
}
