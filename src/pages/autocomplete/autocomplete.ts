import { Component, NgZone, ViewChild, OnInit } from '@angular/core';
import { ViewController, IonicPage, Searchbar, NavController } from 'ionic-angular';
import { Address } from '../../model/address/address.model';

declare var google;
/**
 * Generated class for the AutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage implements OnInit {

  autocompleteItems;
  autocomplete;
  @ViewChild('autoFocus') searchInput: Searchbar;

  data: Address = {
    lat: 0,
    lng: 0,
    name: '',
    radius: 100
  };
  geo: any;

  service = new google.maps.places.AutocompleteService();

  constructor (public viewCtrl: ViewController, private zone: NgZone, private navCtrl: NavController) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async chooseItem(item: any) {
    this.geo = item;
    await this.geoCode(this.geo);
    console.log(this.data);
    this.viewCtrl.dismiss(this.data);
  }

  updateSearch() {

    if (this.autocomplete.query == '') {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query
   }, (predictions, status) => {
     me.autocompleteItems = [];

   me.zone.run(() => {
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results, status) => {
      console.log(results);
      this.data.lat = results[0].geometry.location.lat();
      this.data.lng = results[0].geometry.location.lng();
      this.data.name = address;
      console.log(this.data);
      resolve();
   });
    });
 }

 ngOnInit(): void {
  if (
    !localStorage.hasOwnProperty("token") ||
    !localStorage.hasOwnProperty("user_id")
  ) {
    this.navCtrl.setRoot("LoginPage");
  }
}

}
