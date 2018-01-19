import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { PoiPage } from '../pages/poi/poi';
import { CameraPage } from '../pages/camera/camera';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PoiPage;

  pages: Array<{title: string, component: any, icon?: string}>;

  constructor(public iab: InAppBrowser, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Map', component: MapPage, icon: 'map' },
      { title: 'POI', component: PoiPage, icon: 'pin' },
      { title: 'Camera', component: CameraPage, icon: 'camera' }, 
      { title: 'Gallery', component: ListPage, icon: 'list' }      
    ];

  }

  openFB(){
    let options: InAppBrowserOptions = {
      location: 'no',
      zoom: 'no'
    }
    const browser = this.iab.create('https://m.facebook.com/FTRoadpedia/', '_self',  options);
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
    this.nav.setRoot(page.component);
  }
}
