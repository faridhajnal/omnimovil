import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

let baseUrl = 'http://localhost:3000/api/'
//let baseUrl = 'https://omnipompis.herokuapp.com/api/'
@Injectable()
export class DataService {

  constructor(public http: Http) {}

  getTransactions(businessId : string){

    console.log('get transactions');
    return new Promise(resolve => {

      this.http.get(baseUrl + 'transaction/business/' + businessId)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    });
  }

}
