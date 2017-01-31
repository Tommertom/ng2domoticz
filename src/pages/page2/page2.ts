import { Component } from '@angular/core';

import { ToastController, NavController, NavParams } from 'ionic-angular';

import { DomoticzTestService, DomoticzSettingsModel } from './../../providers/domoticz.provider';


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  deviceList: Array<string> = [];
  deviceData: Object = {};

  deviceSubscription: any;

  constructor(
    public navCtrl: NavController,
    public domoticzService: DomoticzTestService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.startObserving();
  }

  startObserving() {
    // set the initial list
    this.deviceList = [];

    // if we already observed stuff, then undo the subscription
    if (this.deviceSubscription !== undefined) {
      this.deviceSubscription.unsubscribe();
      //console.log('unsub');
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

  isDimmable(device) {
    return (device['HaveDimmer'] == true) && ( device['MaxDimLevel']!= 0)
  }

  canToggle(device){
    return (device['SwitchType'] == 'On/Off');
  }

  canSetTemp(device) {
    return (device['SubType'] == "SetPoint");
  }

  hasTemperature(device) {
    return (typeof device['Temp'] != 'undefined')
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
