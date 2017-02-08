import { Component } from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import { Backend } from "../../providers/backend";

@Component({
  selector: 'page-page1',
  templateUrl: 'free-classes.html'
})
export class FreeClassesPage {
  constructor(public navCtrl: NavController, public backend: Backend) {
    backend.updateFreeClasses();
  }

  doRefresh(refresher) {
    this.backend.updateFreeClasses();
    setTimeout(() => refresher.complete(), 1000);
  }
}
