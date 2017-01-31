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
  refreshdelay: 1000
};

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  deviceList: Array<string> = [];
  deviceData: Object = {};
  //  idxList: Array<number> = [];

  deviceSubscription: any;
  settings: DomoticzSettingsModel = defaultSettings;

  constructor(
    public navCtrl: NavController,
    public domoticzService: DomoticzTestService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.domoticzService.initDomoticzService(this.settings); // to avoid issues when going to Page2 without startObserving
  }

  startObserving() {
    this.domoticzService.initDomoticzService(this.settings);

    // set the initial list
    this.deviceList = [];

    // if we already observed stuff, then undo the subscription
    if (this.deviceSubscription !== undefined) {
      this.deviceSubscription.unsubscribe();
      // console.log('unsub');
    }

    // and start observing again
    this.deviceSubscription = this.domoticzService.getDomoticzDeviceObservable()
      .subscribe(
      value => {

        // if the device is already found, then don't add it
        if (this.deviceList.indexOf(value['idx']) == -1) this.deviceList.push(value['idx']);

        // and replace the data
        this.deviceData[value['idx']] = value;
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
