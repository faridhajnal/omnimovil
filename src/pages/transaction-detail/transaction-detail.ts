import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TransactionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html',
})
export class TransactionDetailPage {

  transaction : any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.transaction = this.navParams.get("transaction");
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  getColor(){
    let lastStatus = this.transaction.statusLog[this.transaction.statusLog.length - 1].statusType;

    return lastStatus === 1 ? 'secondary' : 'danger';

  }



}
