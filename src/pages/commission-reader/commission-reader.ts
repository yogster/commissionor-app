import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommissionorProvider } from '../../providers/commissionor/commissionor';
import { SettingsProvider } from '../../providers/settings/settings';
import { Reader } from '../../providers/commissionor/reader';

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
      readerId: ['', Validators.required],
      placement: ['', Validators.required],
      description: ['', Validators.required]
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

  private commissionReader() {
    var reader = new Reader();
    reader.id = this.form.value.readerId;
    reader.placement = this.form.value.placement;
    reader.description = this.form.value.description;

    this.commissionor.commissionReader(reader).subscribe(
      () => alert("Reader commissioned"),
      error => alert(error.message)
    );
  }
}
