import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

//let baseUrl = 'http://localhost:3000/api/'
let baseUrl = 'https://omnipompis.herokuapp.com/api/'
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataService {

  constructor(public http: Http) {}

  getTransactions(){

    return new Promise(resolve => {

      this.http.get(baseUrl + 'transaction/business/59811253d2a6b1001cb2abae')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
