import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Platform } from "ionic-angular";
//let baseUrl = 'http://localhost:3000/api/'
let baseUrl = 'https://omnipompis.herokuapp.com/api/'

@Injectable()
export class UserProvider {

  username : string = '';

  constructor(public http: Http, private platform : Platform, private storage : Storage) {}

  login(email : string, password : string){

    return new Promise((resolve, reject) => {

      this.http.post(baseUrl + 'user/login/', {email,password})
        .map(res => res.json())
        .subscribe(data => {
          this.username = email;
          resolve(data);
        }, e => {
          reject(e);
        });
    });
  }

  save_storage(){
    return new Promise((resolve, reject)=>{
      if(this.platform.is('cordova')){
        this.storage.set('username', this.username);
      }

      else{
        if(this.username) {
          localStorage.setItem('username', this.username);
        }
        else localStorage.removeItem('username');
        resolve();
      }

    })
  }

  load_storage(){
    return new Promise((resolve, reject)=>{
      if(this.platform.is('cordova')){
        this.storage.ready().then(()=>{
          this.storage.get('username').then((username)=>{
            this.username = username;
            resolve();
          });
        });
      }
      else{
        this.username = localStorage.getItem('username');
        resolve();
      }
    })
  }

  delete_user(){
    this.username = null;
    this.save_storage();
  }

}
