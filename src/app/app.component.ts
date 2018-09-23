import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SelectPage } from '../pages/select/select';
import { LoadingPage } from '../pages/loading/loading';

import { Events } from 'ionic-angular';

import { Globals } from '../providers/app/globals';
import { MonstringProvider } from '../providers/ukmnorge/monstring';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = LoadingPage;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		public events: Events,
		public globals: Globals,
		public monstringProvider: MonstringProvider,
	){

		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();

			// Når fylke oppdateres, oppdater mønstrings-id
			this.globals.subscribe('fylke', (fylke) => {

				if( fylke == null || fylke == undefined ) {
					this.globals.set('monstring_id', null);
					//Må sende SelectPage-viewet for å komme seg forbi loading-screen.
					this.rootPage = SelectPage;
					return;
				}
				this.globals.set('monstring_id', 'fylke-'+fylke.id);

			});


			/**
			 * On update globals[ monstring_id ]
			 *
			 * Last inn ny mønstring, og vis gui for (velg eller valgt) mønstring
			**/
			this.globals.subscribe('monstring_id', (id) => {
				this.monstringProvider.getMonstring( id ).then( (monstring) => {
					if( null === id ) {
						this.rootPage = SelectPage;
					} else {
						this.globals.set('monstring', monstring);
						this.rootPage = TabsPage;
					}
				});
			});

			this.globals.init();
		});
	}
}
