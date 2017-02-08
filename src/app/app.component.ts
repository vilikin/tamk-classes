import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, ModalController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { FreeClassesPage } from '../pages/free-classes/free-classes';
import { Backend } from "../providers/backend";
import {BuildingsPage} from "../pages/buildings/buildings";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FreeClassesPage;
  public selectedBuilding: string;
  classes: Object = {};
  classesArray: Array<any> = [];
  initializing: boolean = true;

  constructor(public platform: Platform, private backend: Backend, private modalCtrl: ModalController) {
    this.initializeApp();

    this.backend.getClasses().subscribe(res => {
      this.classesArray = res.resources;

      this.classesArray.forEach(item => {
        this.classes[item.code] = item;
      });

      this.backend.selectedClasses.forEach((classObj) => {
        if (this.classes[classObj.code] !== undefined) {
          this.classes[classObj.code].selected = true;
        }
      });
    });

    this.selectedBuilding = this.backend.selectedBuilding;

    setTimeout(() => this.initializing = false, 1000);
  }

  selectBuilding() {
    let modal = this.modalCtrl.create(BuildingsPage);
    modal.present();

    modal.onDidDismiss(() => {
      this.updateBuilding();
    });
  }

  updateClasses() {
    if (!this.initializing) {
      this.backend.setClasses(this.classes);
    }
  }

  updateBuilding() {
    this.backend.getClasses().subscribe(res => {
      this.initializing = true;
      this.classesArray = res.resources;

      this.classesArray.forEach(item => {
        this.classes[item.code] = item;
      });

      this.backend.selectedClasses.forEach((classObj) => {
        if (this.classes[classObj.code] !== undefined) {
          this.classes[classObj.code].selected = true;
        }
      });

      setTimeout(() => this.initializing = false, 1000);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
