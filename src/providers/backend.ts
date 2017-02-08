import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Backend provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Backend {

  public selectedClasses: Array<any> = [];
  public selectedBuilding: string = "8";
  public freeClasses: Array<any> = [];
  public freePeriod: number = 1;

  constructor(public http: Http) {
    if (localStorage.getItem("classes") && localStorage.getItem("building") && localStorage.getItem("period")) {
      this.selectedBuilding = localStorage.getItem("building");
      this.selectedClasses = JSON.parse(localStorage.getItem("classes"));
      this.freePeriod = parseInt(localStorage.getItem("period"));
    } else {
      this.saveFreePeriod();
      this.saveBuilding();
      this.saveClasses();
    }
  }

  saveFreePeriod() {
    localStorage.setItem("period", this.freePeriod.toString());
  }

  saveBuilding() {
    localStorage.setItem("building", this.selectedBuilding);
  }

  saveClasses() {
    localStorage.setItem("classes", JSON.stringify(this.selectedClasses));
    this.updateFreeClasses();
  }

  getBuildings() {
    let url = 'http://koti.tamk.fi/~c4vkinnu/free-classes/query.php?get=buildings';
    return this.http.get(url).map(res => res.json());
  }

  setClasses(classes: Object) {
    this.selectedClasses = [];
    Object.keys(classes).forEach((classCode) => {
      if (classes[classCode].selected === true) {
        this.selectedClasses.push(classes[classCode]);
      }
    });

    this.saveClasses();
  }

  getClasses() {
    let url = 'http://koti.tamk.fi/~c4vkinnu/free-classes/query.php?get=classes&building=' + this.selectedBuilding;
    return this.http.get(url).map(res => res.json());
  }

  updateFreeClasses() {
    let start = new Date();
    start.setTime( start.getTime() - start.getTimezoneOffset()*60*1000 );
    let end = new Date();
    end.setTime( end.getTime() - end.getTimezoneOffset()*60*1000 );
    end.setHours(start.getHours() + this.freePeriod + 2);

    let free = JSON.parse(JSON.stringify(this.selectedClasses));

    let urlArray = [];

    free.forEach(freeClass => {
      urlArray.push(freeClass.code);
    });

    let url = 'http://koti.tamk.fi/~c4vkinnu/free-classes/query.php?get=free' +
      '&classes=' + urlArray.join(",") +
      '&start=' + start.toISOString() + '&end=' + end.toISOString();

    console.log(url);

    this.http.get(url).map(res => res.json()).subscribe((res) => {
      res.reservations.forEach(reservation => {
        reservation.resources.forEach(resource => {
          free.forEach((freeClass, freeIndex) => {
            if (freeClass.code === resource.code) {
              free.splice(freeIndex, 1);
            }
          });
        })
      });
    });

    this.freeClasses = free;
  }

}
