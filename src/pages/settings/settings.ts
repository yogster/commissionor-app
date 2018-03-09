import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { NFC } from '@ionic-native/nfc';
import { AlertController, Alert } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder, private settings: SettingsProvider, private nfc: NFC, private alertCtl: AlertController) {
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

  private pairCard() {
    let alert: Alert;
    let obs = this.nfc.addTagDiscoveredListener(
      () => {
        alert = this.alert('Tap your card on the back of your device to pair it to Comissionor', [ "cancel"]);
        alert.present().then(() => obs.unsubscribe())
      }, 
      () => this.alert('error attaching ndef listener')
    )
    .subscribe((event) => {
      obs.unsubscribe();
      alert.dismiss();
      this.alert(JSON.stringify(event)).present();
    });
  }

  private alert(message: string, buttons: Array<string> = [ "ok" ]): Alert {
    console.log("alert: " + message)
    return this.alertCtl.create({
      subTitle: message,
      buttons: buttons
    });
  }
}
