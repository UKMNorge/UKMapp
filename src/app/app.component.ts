import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SelectPage } from '../pages/select/select';
import { LoadingPage } from '../pages/loading/loading';

import { Events } from 'ionic-angular';
import { StorageUnit, StorageProvider } from '../providers/storage';
import { MonstringProvider, Monstring } from '../providers/ukm/monstring';
import { MonstringerProvider } from '../providers/ukm/monstringer.collection';
import { WordpressProvider } from '../providers/wordpress';

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
		private storageProvider: StorageProvider,
		private wordpressProvider: WordpressProvider
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
					this.storageProvider.clear();
					this.wordpressProvider.clear();
					this.monstringProvider.clear();
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
		console.warn('SELECT BASE PAGE: '+ id );
		if( null == id ) {
			console.warn('ROOTPAGE == SelectPage');
			this.rootPage = SelectPage;
			this.wordpressProvider.setMonstringId( null );
			this.wordpressProvider.setMonstringUrl( null );
		} else {
			this.monstringProvider.get( id ).then( 
				(monstring:Monstring) => 
				{
					if( monstring == null || monstring == undefined ) {
						throw new Error('Beklager, klarte ikke å hente mønstringens url');
					}
					console.warn('ROOTPAGE == TabsPage');
					this.wordpressProvider.setMonstringUrl( monstring.url );
					this.wordpressProvider.setMonstringId( id );					
					this.rootPage = TabsPage;
				}
			);
			}
	}
}