import { DomoticzDeviceModel } from './../../../../Domey/src/models/domoticzdevice.model';

import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


//import { DomoticzService } from '..\..\providers\domoticz.provider';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from "rxjs/Rx";

import { DomoticzTestService, DomoticzSettingsModel } from './../../providers/domoticz.provider';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

const defaultSettings = {
  server: '192.168.178.33',
  protocol: 'http://',
  port: '8080',
  refreshdelay: 10000
};

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  domoticzIP: string = "192.168.178.33";
  domoticzPort: string = "8080";
  //observable: Observable<Object>;
  deviceList: Array<Object> = [];
  idxList: Array<number> = [];
  subscription: any;
  settings: DomoticzSettingsModel = defaultSettings;

  constructor(
    public navCtrl: NavController,
    public domoticzService: DomoticzTestService,
    private toastCtrl: ToastController
  ) { }



  startObserving() {
    // let stuff: any = this.domoticzService.domoticzNumbers();

    //console.log('this obser', this.observable);
    //this.observable = this.domoticzService.getDomoticzDeviceObservable(defaultSettings);
    //console.log('this obser', this.observable);
    /*
        let prut = this.domoticzService.domoticzNumbers().toArray().subscribe(
          value => {
            console.log('arr', value);
          },
          error => console.log('arr', error),
          () => console.log('Finished arr')
    
        );
    
    */
    this.deviceList = [];

    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
      console.log('unsub');
    }

    this.subscription = this.domoticzService.getDomoticzDeviceObservable(defaultSettings)
      .subscribe(
      value => {
        // if the device is already found, then don't add it, but replace the element in the list
        this.deviceList.push(value);
      },

      error => console.log(error),
      () => console.log('Finished')
      );
  }




  /**
   * Do a toast message.
   * 
   * @param {string} message - The message to be toasted.
   */
  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
