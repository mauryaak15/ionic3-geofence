import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Task } from '../../model/task/task.model';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ApiResponse } from '../../model/apiResponse/apiResponse.model';

/**
 * Generated class for the EditTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTaskPage implements OnInit {

  task: Task;
  labels = ['Important', 'Personal', 'Home', 'Office'];

  constructor(private navCtrl: NavController, 
    private navParams: NavParams,
    private dataService: DataServiceProvider,
    private loading: LoadingController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTaskPage');
  }

  editTask() {
    let loader: Loading;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    this.dataService.editTask(this.task).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status){
        this.viewCtrl.dismiss();
      }
      this.presentAlert(data.message);
    }, err => console.log(err));
  }

  presentAlert(title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['Ok']
    });
    alert.present().then(() => {
      if(title == 'Token expired. Please login again.' || title == 'Token not found.'){
        localStorage.clear();
        // this.navCtrl.setRoot('LoginPage');
        location.reload(true);
      }
    });
  }

  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("user_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }else {
      this.task = this.navParams.get('task');
    }
  }

}
