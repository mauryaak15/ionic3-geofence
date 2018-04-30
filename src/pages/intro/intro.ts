import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(private navCtrl: NavController, private navParams: NavParams) {
  }

  navHome(): void {
    this.navCtrl.remove(0, this.navCtrl.length()-1);
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
