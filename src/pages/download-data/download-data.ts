import { Component } from '@angular/core';
import { CommissionorProvider } from '../../providers/commissionor/commissionor';
import { AlertController } from 'ionic-angular';
import { Reader } from '../../providers/commissionor/reader';
import { FlattenedReader } from './flattenedReader';
import * as json2csv from 'json2csv';
import { File } from '@ionic-native/file';
import { SettingsProvider } from '../../providers/settings/settings';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-download-data',
  templateUrl: 'download-data.html',
  providers: [CommissionorProvider]
})
export class DownloadDataPage {  
  constructor(private commissionor: CommissionorProvider, private alertCtl: AlertController, private file: File,
              private socialSharing: SocialSharing, settings: SettingsProvider) {
    settings.getCommissionorServerUrl().then(url => {
      if (url)
        this.commissionor.initialise(url);
      else
        this.alert("No server URL");
    });
  }

  onDownload() {
    this.commissionor.getReaders().subscribe(
      readers => {
        let flattenedReaders = this.flattenReaders(readers);
        let readersAsCsv = json2csv.parse(
          flattenedReaders,
          { fields: [ "id", "placement", "description", "site", "room", "door" ] }
        );
        const filename = "readers.csv";
        this.file.writeFile(this.file.dataDirectory, filename, readersAsCsv, { replace: true })
          .then(() => this.socialSharing.shareWithOptions({
            subject: "Commissioned readers",
            message: "This is the list of commissioned readers",
            files: [ this.file.dataDirectory + filename ]
          }))
          .then(() => this.file.removeFile(this.file.dataDirectory, filename))
          .catch(error => this.alert(error.message));
      },
      error => this.alert(error.message)
    );
  }

  private flattenReaders(readers: Array<Reader>): Array<FlattenedReader> {
    let flattenedReaders = new Array<FlattenedReader>();
    readers
      .sort((r1, r2) => r1.id.localeCompare(r2.id))
      .forEach(reader =>
        reader.locations
          .map(location => {
            let flattenedReader  = new FlattenedReader();
            flattenedReader.description = reader.description;
            flattenedReader.door = location.door;
            flattenedReader.id = reader.id;
            flattenedReader.placement = reader.placement;
            flattenedReader.room = location.room;
            flattenedReader.site = location.site;
            return flattenedReader
          })
          .forEach(flattenedReader => flattenedReaders.push(flattenedReader))
      );
    return flattenedReaders;
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
