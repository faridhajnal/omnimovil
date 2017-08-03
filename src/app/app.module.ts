import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from "../pages/settings/settings";
import { SMS } from "@ionic-native/sms";
import { DataService } from "../providers/data/data";
import { HttpModule } from "@angular/http";
import { TransactionDetailPage } from "../pages/transaction-detail/transaction-detail";
import { LoginPage } from "../pages/login/login";
import { Keyboard } from "@ionic-native/keyboard";
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    TransactionDetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false,
      backButtonText : 'Regresar'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    TransactionDetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    DataService,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide : LOCALE_ID, useValue : "es-MX"},
    UserProvider
  ]
})
export class AppModule {}
