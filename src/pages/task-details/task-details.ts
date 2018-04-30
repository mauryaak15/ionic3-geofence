import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Task } from '../../model/task/task.model';
import * as moment from 'moment-timezone';
/**
 * Generated class for the TaskDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage implements OnInit {

  labels = ['Important', 'Personal', 'Home', 'Office'];
  task: Task = {
    title: '',
    desc: '',
    addr: {
      lat: 0,
      lng: 0,
      name: '',
      radius: 100
    },
    label: '',
    creationDate: '',
    type: 1
  };

  constructor(private viewCtrl: ViewController,private  navCtrl: NavController, private navParams: NavParams) {
    this.task.addr = this.navParams.get('address');
    console.log(this.task);
  }

  addTask() {
    console.log('clicked');
    console.log(moment().tz("Asia/Kolkata").format('YYYY-MM-DD hh:mm:ss'));
    this.task.creationDate = moment().tz("Asia/Kolkata").format('YYYY-MM-DD hh:mm:ss');
    this.viewCtrl.dismiss(this.task);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.task);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailsPage');
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
