import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import * as SignalR from '@aspnet/signalr-client';

@Component({
  selector: 'page-commission-reader',
  templateUrl: 'commission-reader.html'
})
export class CommissionReaderPage {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      readerId: ['', Validators.required]
    });

    let that = this;
    let connection = new SignalR.HubConnection('http://localhost:5000/api/events');
    connection.on('event', data => {
      that.form= that.formBuilder.group({
        readerId: [data.readerId, Validators.required]
      });
    });

    connection.start();
  }

  logForm(){
    console.log(this.form.value)
  }

}
