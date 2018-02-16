import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { CommissionorProvider } from '../../providers/commissionor/commissionor'

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private form : FormGroup;

  constructor(private storage: Storage, private formBuilder: FormBuilder, private commissionor: CommissionorProvider) {
    this.form = this.formBuilder.group({
      serverUrl: ['', Validators.required]
    });

    commissionor.getCommissionorServerUrl().then(url =>
      this.form = this.formBuilder.group({
        serverUrl: [url, Validators.required]
      })
    );
  }

  saveSettings() {
    this.commissionor.commissionorServerUrl  = this.form.value.serverUrl;
  }

}
