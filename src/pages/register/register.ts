import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name:string = '';
  password:string = '';
  email:string = '';
  errorMsg:string;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public alertCtrl: AlertController,
   public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  myRegister(){

    if (this.email.trim() && this.password.trim() && this.name.trim()){
      console.log(this.email.trim() + " " + this.password.trim() + " " + this.name.trim())

      if(this.password.trim() === '') {
        this.errorFunc('Please put your passsword')
      } else {
        let credentials = {
          email: this.email,
          name: this.name,
          password: this.password
        };

        this.authService.createAccount(credentials).then((result) => {
          console.log(result);
          this.navCtrl.setRoot(LoginPage);
        }, (err) => {
          console.log(err);
          this.errorFunc('Wrong credentials ! try again')
          console.log("credentials: "+JSON.stringify(credentials))
        });
      }
    }

  }

  errorFunc(message){
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
