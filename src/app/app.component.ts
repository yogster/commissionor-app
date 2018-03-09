import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CommissionReaderPage } from '../pages/commission-reader/commission-reader';
import { SettingsPage } from '../pages/settings/settings';
import { DownloadDataPage } from '../pages/download-data/download-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SettingsPage;

  pages: Array<{title: string, component: any, parameters?: object}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Commission Reader', component: CommissionReaderPage },
      { title: 'Replace Reader', component: CommissionReaderPage, parameters: { replace: true } },
      { title: 'Download Data', component: DownloadDataPage },
      { title: 'Settings', component: SettingsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.parameters);
  }
}
