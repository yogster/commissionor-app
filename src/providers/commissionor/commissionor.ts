import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HubConnection } from '@aspnet/signalr-client';
import { Reader } from './reader';
import { Observable } from "rxjs/Observable";
import { ReaderLocation } from './reader-location';

@Injectable()
export class CommissionorProvider {

  private url: string;
  private connection: HubConnection;

  constructor(private events: Events, private http: HttpClient) {
  }

  openEventConnection(url: string) : Promise<void> {
    this.closeEventConnection();
    this.url = url;
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

  commissionReader(reader: Reader): Observable<string> {
    return this.http.put(this.url + "api/readers/" + reader.id, reader, { responseType: "text" });
  }

  addReaderLocation(location: ReaderLocation): Observable<string> {
    return this.http.post(this.url + "api/readers/" + location.readerId + "/locations", location, { responseType: "text" });
  }

  getReaderDetails(readerId: string): Observable<Reader> {
    return this.http.get<Reader>(this.url + "api/readers/" + readerId);
  }

  deleteReader(readerId: string): Observable<string> {
    return this.http.delete(this.url + "api/readers/" + readerId, { responseType: "text"});
  }
}
