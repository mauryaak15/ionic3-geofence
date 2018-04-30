import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: Nav;
  rootPage:string = 'LoginPage';
  TaskListPage:string = 'TaskListPage';
  SettingPage:string = 'SettingPage';
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private loading: LoadingController) {
    if (
      localStorage.hasOwnProperty("token") &&
      localStorage.hasOwnProperty("user_id")
    ) {
      this.rootPage = 'TaskListPage';
    }else {
      this.rootPage = 'LoginPage';
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  navigateToSetting(): void {
    this.nav.setRoot('SettingPage');
  }
  navigateToTaskList(flag: number): void {
    this.nav.setRoot('TaskListPage', {flag: flag});
  }

  logout() {
    let loader: Loading;
    if(!loader){
      loader = this.loading.create({
        content: 'Logging out...'
      });
      loader.present();
    }
    localStorage.clear();
    loader.dismiss();
    this.nav.setRoot('LoginPage');
  }

}

