webpackJsonp([0],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transaction_detail_transaction_detail__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, menuCtrl, userService, dataService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.userService = userService;
        this.dataService = dataService;
        this.modalCtrl = modalCtrl;
        this.myTransactions = [];
        this.filteredTransactions = [];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dataService.getTransactions()
            .then(function (data) {
            _this.myTransactions = data;
            _this.transactionFilter = 'all';
            _this.filteredTransactions = _this.myTransactions;
        })
            .catch(function (e) { return console.log(e); });
    };
    HomePage.prototype.showSideMenu = function () {
        this.menuCtrl.toggle();
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.onFilterChange = function (filter) {
        if (filter === 'all')
            this.filteredTransactions = this.myTransactions;
        else if (filter === 'completed') {
            this.filteredTransactions = this.myTransactions.filter(function (transaction) { return transaction.statusLog[transaction.statusLog.length - 1].statusType === 1; });
        }
        else {
            this.filteredTransactions = this.myTransactions.filter(function (transaction) { return transaction.statusLog[transaction.statusLog.length - 1].statusType !== 1; });
        }
    };
    HomePage.prototype.getItems = function (event) {
        this.onFilterChange(this.transactionFilter);
        var val = event.target.value;
        if (val && val.trim() != '') {
            this.filteredTransactions = this.filteredTransactions.filter(function (item) {
                return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HomePage.prototype.showTransactionDetail = function (transaction) {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__transaction_detail_transaction_detail__["a" /* TransactionDetailPage */], { transaction: transaction }).present();
    };
    HomePage.prototype.getColorFromStatus = function (statusLog) {
        if (statusLog[statusLog.length - 1].statusType === 1)
            return '#2ecc71';
        else if (statusLog[statusLog.length - 1].statusType === 0)
            return '#f1c40f';
        else
            return '#e74c3c';
    };
    HomePage.prototype.recargar = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        this.dataService.getTransactions()
            .then(function (data) {
            _this.myTransactions = data;
            _this.transactionFilter = 'all';
            _this.filteredTransactions = _this.myTransactions;
            refresher.complete();
        })
            .catch(function (e) { return console.log(e); });
    };
    HomePage.prototype.logout = function () {
        this.userService.delete_user();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\home\home.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title text-center>OmniPruebas</ion-title>\n\n    <ion-buttons end>\n      <button ion-button\n              icon-only (click)="logout()">\n        <ion-icon name="lock"></ion-icon>\n      </button>\n    </ion-buttons>\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="recargar($event)">\n    <ion-refresher-content\n      pullingText="Jala para refrescar"\n      refreshingText="Obteniendo">\n\n    </ion-refresher-content>\n  </ion-refresher>\n  <ion-searchbar [(ngModel)]="searchTerm" placeholder="Buscar..." showCancelButton="true" cancelButtonText="Cancelar" (ionInput)="getItems($event)"></ion-searchbar>\n  <div>\n    <ion-segment [(ngModel)]="transactionFilter" (ngModelChange)="searchTerm = \'\'; onFilterChange(transactionFilter)">\n      <ion-segment-button value="all">\n        Todas\n      </ion-segment-button>\n      <ion-segment-button value="completed">\n        Completadas\n      </ion-segment-button>\n      <ion-segment-button value="pending">\n        Otras\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n\n\n  <div [ngSwitch]="transactionFilter">\n    <ion-list *ngSwitchCase="\'all\'">\n      <ion-card [ngStyle]="{\'background-color\' : getColorFromStatus(t.statusLog)}" (click)="showTransactionDetail(t)" *ngFor="let t of filteredTransactions">\n        <ion-card-header>\n          {{t.description}}\n        </ion-card-header>\n        <ion-card-content>\n          ${{t.amount}}.00, {{t.createdAt | date}}\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'completed\'">\n      <ion-card [ngStyle]="{\'background-color\' : getColorFromStatus(t.statusLog)}" (click)="showTransactionDetail(t)" *ngFor="let t of filteredTransactions">\n        <ion-card-header>\n          {{t.description}}\n        </ion-card-header>\n        <ion-card-content>\n          ${{t.amount}}.00, {{t.createdAt | date}}\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'pending\'">\n      <ion-card [ngStyle]="{\'background-color\' : getColorFromStatus(t.statusLog)}" (click)="showTransactionDetail(t)" *ngFor="let t of filteredTransactions">\n        <ion-card-header>\n          {{t.description}}\n        </ion-card-header>\n        <ion-card-content>\n          ${{t.amount}}.00, {{t.createdAt | date}}\n        </ion-card-content>\n      </ion-card>\n    </ion-list>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, keyboard, loadingCtrl, alertCtrl, userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
        this.mail = '';
        this.pwd = '';
        this.username = '';
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        /*setTimeout(() => {
          this.keyboard.show(); // for android
          this.myInput.setFocus();
        },150); //a least 150ms.*/
    };
    LoginPage.prototype.ngAfterViewInit = function () {
        this.slides.lockSwipes(true);
        this.slides.freeMode = false;
        this.slides.paginationType = "progress";
    };
    LoginPage.prototype.continuar = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Favor de esperar..."
        });
        loading.present();
        this.userService.login(this.mail, this.pwd).then(function (response) {
            loading.dismiss();
            _this.username = response["firstName"] + ' ' + response["lastName"];
            _this.slides.lockSwipes(false);
            _this.slides.slideNext();
            _this.slides.lockSwipes(true);
            _this.userService.save_storage().then(function (r) { return console.log('bien'); }).catch(function (e) { return console.log(e); });
        }).catch(function (e) {
            loading.dismiss();
            _this.pwd = '';
            _this.alertCtrl.create({
                title: "Login fallido",
                subTitle: "Favor de verificar sus credenciales",
                buttons: ["OK"]
            }).present();
        });
    };
    LoginPage.prototype.ingresar = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return LoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], LoginPage.prototype, "slides", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('focusInput'),
    __metadata("design:type", Object)
], LoginPage.prototype, "myInput", void 0);
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\login\login.html"*/'<ion-content padding>\n\n  <ion-slides pager>\n\n    <ion-slide>\n\n\n      <h2 class="slide-title">Bienvenido</h2>\n      <p>Para continuar, ingrese sus credenciales</p>\n\n      <ion-list>\n        <ion-item>\n          <ion-label floating>Correo</ion-label>\n          <ion-input #focusInput type="text" [(ngModel)]="mail"\n                     ></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Contraseña</ion-label>\n          <ion-input type="password" [(ngModel)]="pwd" (keyup.enter)="continuar()"></ion-input>\n        </ion-item>\n      </ion-list>\n\n      <button ion-button block\n              [disabled]="mail.length < 5 || pwd.length < 5"\n      (click)="continuar()">\n      Verificar\n      </button>\n\n\n    </ion-slide>\n\n\n    <!-- Ultimo Slide -->\n    <ion-slide>\n\n      <img src="assets/img/omnipagos.png" class="slide-image"/>\n      <h2 class="slide-title">¡Bienvenido {{username}}!</h2>\n\n      <button ion-button large clear icon-right color="primary"\n              (click)="ingresar()">\n        Ingresar\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n\n    </ion-slide>\n    <!-- Fin del último slide -->\n\n  </ion-slides>\n\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 111:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//let baseUrl = 'http://localhost:3000/api/'
var baseUrl = 'https://omnipompis.herokuapp.com/api/';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.getTransactions = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(baseUrl + 'transaction/business/59811253d2a6b1001cb2abae')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    return DataService;
}());
DataService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], DataService);

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TransactionDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TransactionDetailPage = (function () {
    function TransactionDetailPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.transaction = this.navParams.get("transaction");
    }
    TransactionDetailPage.prototype.cerrarModal = function () {
        this.viewCtrl.dismiss();
    };
    TransactionDetailPage.prototype.getColor = function () {
        var lastStatus = this.transaction.statusLog[this.transaction.statusLog.length - 1].statusType;
        return lastStatus === 1 ? 'secondary' : 'danger';
    };
    return TransactionDetailPage;
}());
TransactionDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-transaction-detail',template:/*ion-inline-start:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\transaction-detail\transaction-detail.html"*/'<ion-header>\n\n  <ion-navbar [color]="getColor()">\n    <ion-title text-center>Transacción {{transaction?._id}}</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="cerrarModal()">Cerrar</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\transaction-detail\transaction-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], TransactionDetailPage);

//# sourceMappingURL=transaction-detail.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sms__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, menuCtrl, sms, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.sms = sms;
        this.toastCtrl = toastCtrl;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.showSideMenu = function () {
        this.menuCtrl.toggle();
    };
    SettingsPage.prototype.sendSMS = function () {
        var _this = this;
        this.sms.send('5540342197', 'Prueba mensaje múltiple').then(function (res) {
            return _this.sms.send('5591922198', 'Prueba mensaje múltiple')
                .then(function (res) {
                return _this.sms.send('5554534459', 'Prueba mensaje múltiple');
            })
                .then(function (res) {
                _this.toastCtrl.create({
                    message: 'Mensajito enviado',
                    duration: 3000
                }).present();
            });
        }).catch(function (e) {
            _this.toastCtrl.create({
                message: 'No se pudo ' + JSON.stringify(e),
                duration: 5000
            }).present();
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\settings\settings.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title text-center>Ajustes</ion-title>\n\n    <!--ion-buttons>\n      <button ion-button\n              icon-only (click)="showSideMenu()">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons-->\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h2>Hello Settings</h2>\n  <button ion-button block color="warning" (click)="sendSMS()">Enviar SMS</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Farid\Documents\Development\Ionic\testy\src\pages\settings\settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sms__["a" /* SMS */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_sms__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_data_data__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_transaction_detail_transaction_detail__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_keyboard__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_user_user__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_transaction_detail_transaction_detail__["a" /* TransactionDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                scrollAssist: false,
                autoFocusAssist: false,
                backButtonText: 'Regresar'
            }),
            __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_transaction_detail_transaction_detail__["a" /* TransactionDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_sms__["a" /* SMS */],
            __WEBPACK_IMPORTED_MODULE_9__providers_data_data__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_keyboard__["a" /* Keyboard */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* LOCALE_ID */], useValue: "es-MX" },
            __WEBPACK_IMPORTED_MODULE_14__providers_user_user__["a" /* UserProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_user__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, userService) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.userService = userService;
        this.home = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.settings = __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__["a" /* SettingsPage */];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            _this.userService.load_storage().then(function () {
                if (_this.userService.username) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                }
                statusBar.styleDefault();
                splashScreen.hide();
            });
        });
    }
    MyApp.prototype.goToPage = function (page) {
        this.rootPage = page;
        this.menuCtrl.close();
    };
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Farid\Documents\Development\Ionic\testy\src\app\app.html"*/'\n<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar color="primary">\n      <ion-title>Páginas</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n\n  <ion-content>\n    <ion-list>\n\n      <button ion-item icon-right (click)="goToPage(home)">\n        Principal<ion-icon name="home"></ion-icon>\n      </button>\n\n      <button ion-item icon-end (click)="goToPage(settings)">\n        Ajustes<ion-icon name="settings"></ion-icon>\n      </button>\n\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n\n\n\n\n<ion-nav [root]="rootPage" #content></ion-nav>\n'/*ion-inline-end:"C:\Users\Farid\Documents\Development\Ionic\testy\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_7__providers_user_user__["a" /* UserProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//let baseUrl = 'http://localhost:3000/api/'
var baseUrl = 'https://omnipompis.herokuapp.com/api/';
var UserProvider = (function () {
    function UserProvider(http, platform, storage) {
        this.http = http;
        this.platform = platform;
        this.storage = storage;
        this.username = '';
    }
    UserProvider.prototype.login = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(baseUrl + 'user/login/', { email: email, password: password })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.username = email;
                resolve(data);
            }, function (e) {
                reject(e);
            });
        });
    };
    UserProvider.prototype.save_storage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.storage.set('username', _this.username);
            }
            else {
                if (_this.username) {
                    localStorage.setItem('username', _this.username);
                }
                else
                    localStorage.removeItem('username');
                resolve();
            }
        });
    };
    UserProvider.prototype.load_storage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('cordova')) {
                _this.storage.ready().then(function () {
                    _this.storage.get('username').then(function (username) {
                        _this.username = username;
                        resolve();
                    });
                });
            }
            else {
                _this.username = localStorage.getItem('username');
                resolve();
            }
        });
    };
    UserProvider.prototype.delete_user = function () {
        this.username = null;
        this.save_storage();
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserProvider);

//# sourceMappingURL=user.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map