import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HubConnection } from '@aspnet/signalr-client';

@Injectable()
export class CommissionorProvider {

  private connection: HubConnection;

  constructor(private events: Events) {
  }

  openEventConnection(url: string) : Promise<void> {
    this.closeEventConnection();
    this.connection = new HubConnection(url + "api/events");
    this.connection.on('event', data => this.events.publish("commissionor:tap", data));
    return this.connection.start();
  }

  closeEventConnection() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }

  subscribeToEvents(handler: (data: any) => void) {
    this.events.subscribe("commissionor:tap", handler);
  }

  unsubscribeFromEvents(handler: (data: any) => void) {
    this.events.unsubscribe("commissionor:tap", handler);
  }
}
