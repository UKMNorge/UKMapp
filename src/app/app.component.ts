import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SelectPage } from '../pages/select/select';
import { LoadingPage } from '../pages/loading/loading';

import { Events } from 'ionic-angular';
import { StorageUnit, StorageProvider } from '../providers/storage';
import { MonstringProvider } from '../providers/ukm/monstring';
import { MonstringerProvider } from '../providers/ukm/monstringer.collection';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = LoadingPage;
	app_storage:StorageUnit;

	constructor(
		platform: Platform, 
		statusBar: StatusBar, 
		splashScreen: SplashScreen, 
		public events: Events, 
		public monstringProvider: MonstringProvider,
		public monstringerProvider: MonstringerProvider,
		private storageProvider: StorageProvider
	) {
		
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
			
			this.app_storage = this.storageProvider.create('APP');
			
			this.app_storage.subscribe(
				'set:monstring', 
				(id) => {
					this._selectBasePage( id );
				}
			);
			this.app_storage.subscribe(
				'remove:monstring',
				( id ) => {
					this._selectBasePage( null );
				}
			)

			this.app_storage.get('monstring').then(
				(id) => {
					this._selectBasePage( id );
				}
			);
		});
	}

	private _selectBasePage( id ) {
		if( null === id ) {
			//Bytt om disse for å få appen i fungerende stand igjen.
			this.rootPage = SelectPage;
			//this.rootPage = InfoPage;
		} else {
			this.rootPage = TabsPage;
			//this.rootPage = InfoPage;
		}
	}
}