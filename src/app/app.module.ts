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
import { HendelsePage } from '../pages/program/hendelse';
import { InnslagPage } from '../pages/program/hendelse';
import { InfoPage } from '../pages/info/info';
import { SingleInfoPage } from '../pages/info/single';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MonstringProvider } from '../providers/ukm/monstring';
import { MonstringerProvider } from '../providers/ukm/monstringer.collection';

import { StorageProvider } from '../providers/storage/storage';
import { ProgramProvider } from '../providers/ukm/program';
import { HendelseProvider } from '../providers/ukm/hendelse';
import { InnslagProvider } from '../providers/ukm/innslag';
import { FilmProvider } from '../providers/ukm/film';
import { WordpressProvider } from '../providers/wordpress';
import { MittProgramProvider } from '../providers/app/mittprogram';

import { ComponentsModule } from '../components/components.module';
import { Calendar } from '@ionic-native/calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { PipesModule } from '../pipes/pipes.module';




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
    HendelsePage,
    InnslagPage,
    ProgramPage,
    InfoPage,
    SingleInfoPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    PipesModule,
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
    HendelsePage,
    InnslagPage,
    ProgramPage,
    InfoPage,
    SingleInfoPage,
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
    InnslagProvider,
    FilmProvider,
    WordpressProvider,
    BrowserTab,
    MittProgramProvider,
    Calendar,
    InAppBrowser,
    StreamingMedia,
  ]
})
export class AppModule {}
