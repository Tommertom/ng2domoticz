import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController,

    private toastCtrl: ToastController
  ) {

  }

  doeSuzeOpScherm() {
    let toast = this.toastCtrl.create({
      message: 'SUZE OP HET SCHERM!!!!',
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
