import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  constructor(private storage: Storage) {
  }

  public setCommissionorServerUrl(url: string) {
    this.storage.set("commissionor:serverUrl", url);
  }

  public getCommissionorServerUrl(): Promise<string> {
    return this.storage.get("commissionor:serverUrl");
  }

}
