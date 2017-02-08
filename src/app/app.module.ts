import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FreeClassesPage } from '../pages/free-classes/free-classes';
import { Backend } from "../providers/backend";
import {BuildingsPage} from "../pages/buildings/buildings";

@NgModule({
  declarations: [
    MyApp,
    FreeClassesPage,
    BuildingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FreeClassesPage,
    BuildingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Backend]
})
export class AppModule {}
