import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder, private settings: SettingsProvider) {
    this.form = this.formBuilder.group({
      serverUrl: ['', Validators.required]
    });

    this.settings.getCommissionorServerUrl().then(url => 
      this.form = this.formBuilder.group({
        serverUrl: [url, Validators.required]
      })
    );
  }

  private onServerUrlBlur() {
    if (!this.form.value.serverUrl.endsWith("/"))
      this.form.patchValue({
        serverUrl: this.form.value.serverUrl + "/"
      });
  }

  private saveSettings() {
    this.settings.setCommissionorServerUrl(this.form.value.serverUrl);
  }

}
