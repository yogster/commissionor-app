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
      serverUrl: ['', Validators.required],
      cardId: ['', Validators.required]
    });

    Promise.all([
      this.settings.getCommissionorServerUrl(),
      this.settings.getCardId(),
    ])
    .then(([url, cardId]) => 
      this.form = this.formBuilder.group({
        serverUrl: [url, Validators.required],
        cardId: [cardId, Validators.required]
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
    this.settings.setCardId(this.form.value.cardId);
  }
}
