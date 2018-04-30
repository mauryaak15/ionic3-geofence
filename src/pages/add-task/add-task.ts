import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { MapProvider } from '../../providers/map/map';
import { MyLocation } from '@ionic-native/google-maps';
import { Address } from '../../model/address/address.model';
import { Task } from '../../model/task/task.model';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ApiResponse } from '../../model/apiResponse/apiResponse.model';

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google;

@IonicPage()

@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage implements OnInit {


  mapId: string = "map_canvas1";
  address = {
      lat: 0,
      lng: 0,
      name: '',
      radius: 100
    } as Address;
  task: Task;

  constructor(private map: MapProvider, 
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private dataService: DataServiceProvider,
    private alertCtrl: AlertController) {
      let loader: Loading;
      if(!loader){
        loader = this.loading.create({
          content: 'Loading...'
        });
        loader.present();
      }
      let me = this;
      this.map.getMyLocation().then((location: MyLocation) => {
        console.log(location);
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': location.latLng}, function(results, status) {
          loader.dismiss();
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0].formatted_address);
              me.address = {
                lat: location.latLng.lat,
                lng: location.latLng.lng,
                name: results[0].formatted_address,
                radius: 100
              };
            } 
          }
        });
        this.map.attachMap(this.mapId, location.latLng);
      });
  }

  showAddressModal () {
    let modal = this.modalCtrl.create('AutocompletePage');
    let me = this;
    modal.onDidDismiss((data: Address) => {
      console.log(data, 'hete');
      if(data) {
        me.address.name = data.name;
        me.address.lat = data.lat;
        me.address.lng = data.lng;
        me.address.radius = data.radius;
        console.log(this.address);
        me.map.attachMap(this.mapId, {lat: <number>data.lat, lng: <number>data.lng});
      }
    });
    modal.present();
  }

  addTaskDetails() {
    let modal = this.modalCtrl.create('TaskDetailsPage', {
      address: this.address
    });
    let me = this;
    modal.onDidDismiss(async (task: Task) => {
      console.log('here');
      let loader: Loading;
      let title: string;
      let subTitle: string;
      if(!loader){
        loader = this.loading.create({
          content: 'Loading...'
        });
        loader.present();
      }
      await this.dataService.addTask(task).subscribe((data: ApiResponse) => {
        console.log(data);
        loader.dismiss();
        if(data.status){
          title = data.message;
          subTitle = '';     
         }else{
           title = data.message;        
           if(data.message == 'Token expired. Please login again.' || data.message == 'Token not found.'){
             subTitle = "Logging you out!";
           }else if(data.message == 'Task details are not complete.'){
             subTitle = "Please provide all details.";
           }else if(data.message == 'Insufficient Data.'){
            subTitle = "Insufficent API data.";
          }
         }
        this.presentAlert(title, subTitle);
      }, err => console.log(err))
    });
    modal.present();
  }

  presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Ok']
    });
    alert.present().then(() => {
      if(title == 'Token expired. Please login again.' || title == 'Token not found.'){
        localStorage.clear();
        // this.navCtrl.setRoot('LoginPage');
        location.reload(true);
      }else if(title == 'Task added successfully'){
        this.navCtrl.setRoot('TaskListPage');
      }
    });
  }

  ionViewWillEnter() {
    
  }

  ionViewWillLeave() {
    this.map.detachMap();
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
