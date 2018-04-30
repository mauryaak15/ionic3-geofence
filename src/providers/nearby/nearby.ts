import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from '../../apiURLs/apiURLs.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Address } from '../../model/address/address.model';
import { Place } from '../../model/places/place.model';
import {} from '@types/googlemaps';
import { Observable } from 'rxjs/Observable';
import { MapProvider } from '../map/map';
import { MyLocation } from '@ionic-native/google-maps';

/*
  Generated class for the NearbyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NearbyProvider {
  urls = URLs;
  constructor(private http: HttpClient,
              private mapService: MapProvider) {
    console.log('Hello NearbyProvider Provider');
  }

  //@TODO remove places array duplicacy and make photo observable wait

  getPlaces(location: Address) {
    let url: string = `${this.urls.nearbyRoot}?location=${location.lat},${location.lng}&rankby=distance&key=${this.urls.key}`;
    let places: Place[] = [];
    return this.http.get(url).map((res: any) => {
      res.results.map(async(place) => {
        let data;
        let photoRef = place.photos;
        if(photoRef == undefined || photoRef == '' || photoRef == null) {
          data = 'http://via.placeholder.com/50x50';
          places.push({
            name: place.name,
            place_id: place.place_id,
            pic: data,
            address: place.vicinity,
            distance: +this.getDistance(await this.mapService.getMyLocation(), place.geometry.location)
          });
        }else {
          this.getOnePhoto(photoRef[0].photo_reference).subscribe(async(_data) => {
            places.push({
              name: place.name,
              place_id: place.place_id,
              pic: _data,
              address: place.vicinity,
              distance: +this.getDistance(await this.mapService.getMyLocation(), place.geometry.location)
            });
          });
        }
        
      });
      return places;
    });
  }

  rad(x) {
    return x * Math.PI / 180;
  };

  
  
  getDistance(p1, p2) {
    p1 = p1.latLng;
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(1); // returns the distance in meter
  };

  getOnePhoto(photoRef: string) {
    let url: string = `${this.urls.photoRoot}&photoreference=${photoRef}&key=${this.urls.key}`;
    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response'
    }).map((res: any) => {
      return res.url;
    });;
  }

}
