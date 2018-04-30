import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { NearbyProvider } from '../../providers/nearby/nearby';
import { Address } from '../../model/address/address.model';
import { Place } from '../../model/places/place.model';

/**
 * Generated class for the PlacesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places-list',
  templateUrl: 'places-list.html',
})
export class PlacesListPage implements OnInit {

  places: Place[] = [];

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private nearbyService: NearbyProvider,
    private loading: LoadingController,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesListPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async getPlaces() {
    let loader;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    let location: Address = this.navParams.get('location');
    await this.nearbyService.getPlaces(location).subscribe(async (res: Place[]) => {
      this.places = await res;
      console.log(this.places);
      loader.dismiss();
    }, err => console.log(err));
  }

  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("user_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }else {
      this.getPlaces();
    }
  }

}
