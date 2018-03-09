import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { CommissionReaderPage } from '../pages/commission-reader/commission-reader';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsProvider } from '../providers/settings/settings';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { DownloadDataPage } from '../pages/download-data/download-data';
import { File } from '@ionic-native/file';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NFC } from '@ionic-native/nfc';

@NgModule({
  declarations: [
    MyApp,
    CommissionReaderPage,
    SettingsPage,
    DownloadDataPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CommissionReaderPage,
    SettingsPage,
    DownloadDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    File,
    SocialSharing,
    NFC
  ]
})
export class AppModule {}
