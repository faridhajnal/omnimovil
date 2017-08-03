import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, Slides} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Keyboard} from "@ionic-native/keyboard";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit{

  @ViewChild(Slides) slides: Slides;
  @ViewChild('focusInput') myInput ;

  mail : string = '';
  pwd : string = '';
  username : string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private keyboard : Keyboard, private loadingCtrl : LoadingController,
              private alertCtrl : AlertController, private userService : UserProvider) {
  }

  ionViewDidLoad() {
    /*setTimeout(() => {
      this.keyboard.show(); // for android
      this.myInput.setFocus();
    },150); //a least 150ms.*/
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }

  continuar(){



    let loading = this.loadingCtrl.create({
      content : "Favor de esperar..."
    });

    loading.present();

    this.userService.login(this.mail, this.pwd).then((response)=>{
      loading.dismiss();
      this.username = response["firstName"] + ' ' + response["lastName"];
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      this.userService.save_storage().then(r=>console.log('bien')).catch(e=>console.log(e));
    }).catch(e=>{
      loading.dismiss();
      this.pwd = '';
      this.alertCtrl.create({
        title : "Login fallido",
        subTitle : "Favor de verificar sus credenciales",
        buttons : ["OK"]
      }).present();
    });

  }

  ingresar(){
    this.navCtrl.setRoot(HomePage);
  }

}
