import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Loading,
  ToastController
} from "ionic-angular";
import { User } from "../../model/user/user.model";
import { AuthService } from "../../providers/auth/auth";
import 'rxjs/add/operator/take';
import { ApiResponse } from "../../model/apiResponse/apiResponse.model";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  } as User;
  constructor(private navCtrl: NavController, private auth: AuthService, private loading: LoadingController, private toastCtrl: ToastController) {
  
  }

  login(){
    let loader: Loading;
    if(!loader){
      loader = this.loading.create({
        content: 'Loading...'
      });
      loader.present();
    }
    this.auth.login(this.user).take(1).subscribe((data: ApiResponse) => {
      loader.dismiss();
      this.createToast(data.message).present();
      if(data.status){
        console.log(JSON.stringify(data));
        localStorage.setItem('token', data.data[0].token);
        localStorage.setItem('user_id', data.data[0].user_id);
        this.navCtrl.setRoot('TaskListPage');
      }
    }, err => console.log(err));
  }

  navigateToRegister() {
    this.navCtrl.push('RegisterPage');
  }

  createToast(msg: string) {
    return this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
  }

}
