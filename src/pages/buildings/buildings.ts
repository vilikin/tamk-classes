import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { Backend } from "../../providers/backend";

/*
  Generated class for the Buildings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buildings',
  templateUrl: 'buildings.html'
})
export class BuildingsPage {

  buildings: Array<any>;
  selectedBuilding: string;

  constructor(public viewCtrl: ViewController, private backend: Backend) {
    this.selectedBuilding = backend.selectedBuilding;

    backend.getBuildings()
      .subscribe(res => {
        this.buildings = res.resources;
      });
  }

  selected() {
    this.backend.selectedBuilding = this.selectedBuilding;
  }

  dismiss() {

    this.viewCtrl.dismiss();
  }
}
