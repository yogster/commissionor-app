import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SettingsProvider } from '../../providers/settings/settings';
import { NFC } from '@ionic-native/nfc';
import { AlertController, Alert } from 'ionic-angular';
import { CommissionorProvider } from '../../providers/commissionor/commissionor';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [CommissionorProvider]
})
export class SettingsPage {

  private form : FormGroup;

  constructor(private formBuilder: FormBuilder, private settings: SettingsProvider, private commissionor: CommissionorProvider, private nfc: NFC, private alertCtl: AlertController) {
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

  private getCardId() {
    this.nfc.enabled().then(enabled => {
      if (enabled) {
        let alert: Alert;
        let obs = this.nfc.addTagDiscoveredListener(
          () => {
            alert = this.alertCtl.create({
              subTitle: "Please tap your card on the back of your device",
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => obs.unsubscribe()
                }
              ]
            });
            alert.present();
          }, 
          () => this.alert('Error listening for cards')
        )
        .subscribe((event) => {
          obs.unsubscribe();
          alert.dismiss();
          this.alert(JSON.stringify(event));
        });
      }
      else
        this.alert('Please enable NFC to use this feature')
    })
    .catch((error) => this.alert(error));
  }

  private getDeviceId() {
    var url = this.form.value.serverUrl;
    if (url) {
      let alert: Alert;
      let eventSubscription = this.commissionor.tapEvent.subscribe(data => {
        eventSubscription.unsubscribe();
        alert.dismiss();
        this.form.patchValue({ cardId: data.deviceId });
      });

      this.commissionor.initialise(url);
      this.commissionor.openEventConnection()
        .then(() => {
          alert = this.alertCtl.create({
            subTitle: "Please tap your device against a card reader",
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => eventSubscription.unsubscribe()
              }
            ]
          });
          alert.present();
        })
      .catch(() => this.alert("Could not connect to server"));
    }
    else
      this.alert("Enter a server URL first");
  }

  private alert(message: string) {
    console.log("alert: " + message)
    this.alertCtl
      .create({
        subTitle: message,
        buttons: ['Ok']
      })
      .present();
  }
}
