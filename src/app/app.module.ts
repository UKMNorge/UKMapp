import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { BrowserTab } from '@ionic-native/browser-tab';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Shake } from '@ionic-native/shake';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AboutPage, SidePage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { SelectPage } from '../pages/select/select';
import { LoadingPage } from '../pages/loading/loading';
import { ProgramPage, HendelsePage, InnslagPage, FilmPage } from '../pages/program/program';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/ukmnorge/api';
import { WPApiProvider } from '../providers/ukmnorge/apiwp';
import { MonstringProvider } from '../providers/ukmnorge/monstring';
import { ProgramProvider } from '../providers/ukmnorge/program';
import { InfoProvider } from '../providers/ukmnorge/info';

import { Globals } from '../providers/app/globals';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SidePage,
    ProfilePage,
    HomePage,
    TabsPage,
    SelectPage,
    MapPage,
    LoadingPage,
    HendelsePage,
    ProgramPage,
    FilmPage,
    InnslagPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SidePage,
    ProfilePage,
    HomePage,
    TabsPage,
    SelectPage,
    MapPage,
    LoadingPage,
    HendelsePage,
    ProgramPage,
    FilmPage,
    InnslagPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    WPApiProvider,
    MonstringProvider,
    ProgramProvider,
    InfoProvider,
    Globals,
    BrowserTab,
    StreamingMedia,
    Shake
  ]
})
export class AppModule {}
