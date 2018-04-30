import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';
import { AuthService } from '../providers/auth/auth';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { MapProvider } from '../providers/map/map';
import { NearbyProvider } from '../providers/nearby/nearby';
import { GeofenceServiceProvider } from '../providers/geofence-service/geofence-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DataServiceProvider,
    MapProvider,
    NearbyProvider,
    GeofenceServiceProvider
  ]
})
export class AppModule {}
