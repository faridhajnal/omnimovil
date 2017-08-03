import { Component } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from "../pages/settings/settings";
import { LoginPage } from "../pages/login/login";
import { UserProvider } from "../providers/user/user";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  home = HomePage;
  settings = SettingsPage;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl : MenuController, private userService : UserProvider) {
    platform.ready().then(() => {
      this.userService.load_storage().then(()=>{
        if(this.userService.username){
          this.rootPage = HomePage;
        }
        else{
          this.rootPage = LoginPage;
        }
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }

  goToPage(page: any){

    this.rootPage = page;
    this.menuCtrl.close();

  }

}

