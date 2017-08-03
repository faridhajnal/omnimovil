import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import { SMS } from "@ionic-native/sms";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private menuCtrl : MenuController, private sms : SMS,
              private toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  showSideMenu(){
    this.menuCtrl.toggle();
  }

  sendSMS(){
    this.sms.send('5540342197', 'Prueba mensaje múltiple').then((res)=>{

      return this.sms.send('5591922198', 'Prueba mensaje múltiple')

        .then((res)=>{
          return this.sms.send('5554534459', 'Prueba mensaje múltiple')
        })

        .then((res)=>{

          this.toastCtrl.create({
            message: 'Mensajito enviado',
            duration: 3000
          }).present();
        })

    }).catch(e => {
      this.toastCtrl.create({
        message: 'No se pudo ' + JSON.stringify(e) ,
        duration: 5000
      }).present();
    });
  }


}
