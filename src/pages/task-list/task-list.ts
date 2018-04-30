import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ModalController, ItemSliding } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Task } from '../../model/task/task.model';
import { ApiResponse } from '../../model/apiResponse/apiResponse.model';
import { Address } from '../../model/address/address.model';
import {} from '@types/googlemaps';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html'
})

export class TaskListPage implements OnInit {

  tasks: Task[] = [];
  flag: number;

  constructor(private navCtrl: NavController, 
    private navParams: NavParams, 
    private modalCtrl: ModalController,
    private dataService: DataServiceProvider,
    private loading: LoadingController,
    protected alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  addTask(): void {
    this.navCtrl.push('AddTaskPage');
  }

  async getAllTask() {
    let loader: Loading;
    let title;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    await this.dataService.getAllTask().subscribe(async (data: ApiResponse) => {
      console.log(data);
      loader.dismiss();
      if(data.status){
          this.tasks = await data.data[0].task;
        }else{
          title = data.message;
          this.presentAlert(title);
        }
    }, err => console.log(err));
      
  }

  markComplete(task: Task, item: ItemSliding) {
    let loader: Loading;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    this.dataService.markComplete(task.id).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status) {
        task.isComplete = 1;
      }else {
        this.presentAlert(data.message);
      }
      item.close();
    }, err => console.log(err));
  }

  editTask(task: Task, item: ItemSliding) {
    this.showEditTaskModal(task);
    item.close();
  }

  showEditTaskModal (task: Task) {
    let modal = this.modalCtrl.create('EditTaskPage', {task: task});
    let me = this;
    modal.onDidDismiss(() => {
      console.log('exit from edit modal');
    });
    modal.present();
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

  getNearByPlaces(location: Address, item: ItemSliding) {
      item.close();
      this.showNearByModal(location);
  } 

  showNearByModal (location: Address) {
    let modal = this.modalCtrl.create('PlacesListPage', {location: location});
    let me = this;
    modal.onDidDismiss(() => {
      console.log('exit from nearby');
    });
    modal.present();
  }

  deleteTask(task: Task, item: ItemSliding) {
    let loader: Loading;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    this.dataService.deleteTask(task.id).subscribe((data: ApiResponse) => {
      loader.dismiss();
      if(data.status) {
        let itemIndex = this.tasks.indexOf(task);
        if(itemIndex != -1 ) {
          this.tasks.splice(itemIndex, 1);
        }else {
          this.presentAlert('Task not found');
        }
      }else {
        this.presentAlert(data.message);
      }
      item.close();
    }, err => console.log(err));
  }

  ngOnInit(): void {
    if (
      !localStorage.hasOwnProperty("token") ||
      !localStorage.hasOwnProperty("user_id")
    ) {
      this.navCtrl.setRoot("LoginPage");
    }else {
      let _flag = this.navParams.get('flag');
      this.flag = (_flag == -1 || _flag == 0 || _flag == 1 ) ? _flag : -1;
      this.getAllTask();
    }
  }

}
