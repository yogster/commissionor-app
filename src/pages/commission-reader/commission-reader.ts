import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { CommissionorProvider } from '../../providers/commissionor/commissionor';

@Component({
  selector: 'page-commission-reader',
  templateUrl: 'commission-reader.html'
})
export class CommissionReaderPage {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder, private commissionor: CommissionorProvider) {
    this.setupForm();
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      readerId: ['', Validators.required]
    });
  }

  logForm(){
    console.log(this.form.value)
  }

}
