import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

//import { DomoticzService } from '..\..\providers\domoticz.provider';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BehaviorSubject} from "rxjs/Rx";

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';


@Injectable()
export class DomoticzService {

  private _settings: any;
  //	private _actions = [];
  private numbers: BehaviorSubject<Array<number>> = new BehaviorSubject([]);

  constructor() { };

  domoticzNumbers() {
    return this.numbers.asObservable();
  }

  loadNumbers() {
         setTimeout(() => {
            this.numbers.next([42]);
          }, 1000);
    
          setTimeout(() => {
            this.numbers.next([43]);
          }, 2000);
    
          setTimeout(() => {
            this.numbers.complete();
          }, 3000);
  } 
}

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  domoticzIP: string = "192.168.178.33";
  domoticzPort: string = "8080";
  observable: Observable<Array<number>>;


  constructor(
    public navCtrl: NavController,
    public domoticzService: DomoticzService,
    private toastCtrl: ToastController
  ) {

  }

  startObserving() {
    let stuff: any = this.domoticzService.domoticzNumbers();
    this.observable = this.domoticzService.domoticzNumbers();

    let subscription = this.observable.subscribe(
      value => console.log(value),
      error => console.log(error),
      () => console.log('Finished')
    );

    this.domoticzService.loadNumbers();
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
