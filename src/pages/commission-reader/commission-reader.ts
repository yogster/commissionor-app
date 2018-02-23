import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommissionorProvider } from '../../providers/commissionor/commissionor';
import { SettingsProvider } from '../../providers/settings/settings';
import { Reader } from '../../providers/commissionor/reader';
import { LocationComponent } from '../../components/location/location';

@Component({
  selector: 'page-commission-reader',
  templateUrl: 'commission-reader.html',
  providers: [CommissionorProvider]
})
export class CommissionReaderPage {

  private form : FormGroup;
  private locations: FormArray;

  constructor(private formBuilder: FormBuilder, private settings: SettingsProvider, private commissionor: CommissionorProvider) {
    this.setupForm();
    this.addLocation();
    this.commissionor.subscribeToEvents(eventData => this.onTap(eventData));
  }

  ionViewWillEnter() {
    this.connect();
  }

  ionViewDidLeave() {
    this.commissionor.closeEventConnection();
  }

  private setupForm() {
    this.locations = this.formBuilder.array([]);
    this.form = this.formBuilder.group({
      readerId: ['', Validators.required],
      placement: ['', Validators.required],
      description: ['', Validators.required],
      locations: this.locations
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

  private addLocation() {
    var newLocationFormGroup = LocationComponent.createFormGroup(this.formBuilder);
    this.locations.push(newLocationFormGroup);
  }

  private deleteLocation(locationNumber: number) {
    if (this.locations.length > 1)
      this.locations.removeAt(locationNumber - 1);
    else
      alert("There must be at least one location");
  }
}
