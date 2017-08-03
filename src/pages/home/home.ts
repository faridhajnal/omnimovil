import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController, Refresher } from 'ionic-angular';
import { DataService } from "../../providers/data/data";
import { TransactionDetailPage } from "../transaction-detail/transaction-detail";
import { LoginPage } from "../login/login";
import {UserProvider} from "../../providers/user/user";

export interface Transaction {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  processor: number;
  description?: string;
  amount?: number;
  statusLog: Array<any>;
  clientId: string;
  businessId: string;
  additionalData?: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{


  myTransactions : Array<Transaction> = [];

  filteredTransactions : Array<Transaction> = [];

  transactionFilter : string;

  constructor(public navCtrl: NavController, private menuCtrl : MenuController,
              private userService : UserProvider,
              private dataService : DataService, private modalCtrl : ModalController) {

  }

  ionViewDidLoad(){
      this.dataService.getTransactions()
        .then((data : Array<Transaction>)=>{
        this.myTransactions = data;
        this.transactionFilter = 'all';
        this.filteredTransactions = this.myTransactions;
        })
        .catch(e=> console.log(e));
  }

  showSideMenu(){
      this.menuCtrl.toggle();
  }

  ngOnInit(){

  }

  onFilterChange(filter : string){
    if(filter === 'all') this.filteredTransactions = this.myTransactions;
    else if(filter === 'completed') {
      this.filteredTransactions = this.myTransactions.filter(transaction => transaction.statusLog[transaction.statusLog.length - 1].statusType === 1);
    }
    else {
      this.filteredTransactions = this.myTransactions.filter(transaction => transaction.statusLog[transaction.statusLog.length - 1].statusType !== 1);
    }
  }

  getItems(event : any){
    this.onFilterChange(this.transactionFilter);
    let val = event.target.value;

    if (val && val.trim() != '') {
      this.filteredTransactions = this.filteredTransactions.filter((item) => {
        return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  showTransactionDetail(transaction : Transaction){
      this.modalCtrl.create(TransactionDetailPage, {transaction}).present();
  }

  getColorFromStatus(statusLog : any){
      if(statusLog[statusLog.length - 1].statusType === 1) return '#2ecc71';
      else if(statusLog[statusLog.length - 1].statusType === 0) return '#f1c40f';
      else return '#e74c3c';
  }

  recargar(refresher:Refresher){
    console.log('Begin async operation', refresher);
    this.dataService.getTransactions()
      .then((data : Array<Transaction>)=>{
        this.myTransactions = data;
        this.transactionFilter = 'all';
        this.filteredTransactions = this.myTransactions;
        refresher.complete();
      })
      .catch(e=> console.log(e));
  }

  logout(){
    this.userService.delete_user();
    this.navCtrl.setRoot(LoginPage);
  }

}
