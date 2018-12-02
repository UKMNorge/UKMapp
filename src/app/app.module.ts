import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { SelectPage } from '../pages/select/select';
import { LoadingPage } from '../pages/loading/loading';
import { ProgramPage } from '../pages/program/program';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MonstringProvider } from '../providers/ukm/monstring';
import { MonstringerProvider } from '../providers/ukm/monstringer';

import { StorageProvider } from '../providers/storage/storage';
import { ProgramProvider } from '../providers/ukm/program';
import { HendelseProvider } from '../providers/ukm/hendelse';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    SelectPage,
    MapPage,
    LoadingPage,
    ProgramPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    TabsPage,
    SelectPage,
    MapPage,
    LoadingPage,
    ProgramPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    MonstringProvider,
    MonstringerProvider,
    ProgramProvider,
    HendelseProvider,
    BrowserTab
  ]
})
export class AppModule {}
