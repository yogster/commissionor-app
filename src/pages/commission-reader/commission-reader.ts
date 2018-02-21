import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommissionorProvider } from '../../providers/commissionor/commissionor';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-commission-reader',
  templateUrl: 'commission-reader.html',
  providers: [CommissionorProvider]
})
export class CommissionReaderPage {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder, private settings: SettingsProvider, private commissionor: CommissionorProvider) {
    this.setupForm();
    this.commissionor.subscribeToEvents(eventData => this.onTap(eventData));
  }

  ionViewWillEnter() {
    this.connect();
  }

  ionViewDidLeave() {
    this.commissionor.closeEventConnection();
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      readerId: ['', Validators.required]
    });
  }

  private connect() {
    this.settings.getCommissionorServerUrl().then(url => {
      if (url)
        this.commissionor.openEventConnection(url).catch(err => {
          alert("Connection error");
        });
      else
        alert("No server URL");
    });
  }

  private onTap(eventData: any) {
    this.form.patchValue({
      readerId: eventData.readerId
    });
  }
}
