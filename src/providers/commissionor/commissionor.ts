import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HubConnection } from '@aspnet/signalr-client';

/*
  Generated class for the CommissionorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommissionorProvider {

  private connection: HubConnection;

  constructor(private events: Events, private storage: Storage) {
    this.openEventConnection();
  }

  set commissionorServerUrl(url: string) {
    this.storage.set("commissionor:serverUrl", url);
  }

  getCommissionorServerUrl(): Promise<string> {
    return this.storage.get("commissionor:serverUrl");
  }

  private openEventConnection() {
    if (this.connection == null) {
      this.getCommissionorServerUrl().then(url => {
        if (url)
        {
          this.connection = new HubConnection(url);
          this.connection.on('event', data => this.events.publish("commissionor:tap", data));
          this.connection.start();
        }
      });
    }
  }

  private closeEventConnection() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
}
