import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/ukmnorge/utils/storage/storage.service';
import { Router } from '@angular/router';
import { MonstringService } from './services/ukmnorge/app/monstring.service';
import { ActiveService } from './services/ukmnorge/app/active.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {

	private app_storage;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private router: Router,
		private statusBar: StatusBar,
		private storageService: StorageService,
		private activeService: ActiveService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			
			//console.log('STORAGE MONITOR READY');
			this.storageService.getStatus().subscribe(
				(storageIsReady) => {
					//console.log('STORAGE APP GOT STATUS:', storageIsReady);
					if( storageIsReady ) {
						this._loadStart();
					}
				}
			);
		});
	}

	ngOnInit() {
	}

	private _loadStart() {
		let self = this;
		self.app_storage = self.storageService.create('APP');
		// Load from storage
		self.app_storage.get('monstring').then(
			(selected_data) => {
				if( selected_data && selected_data.id ) {
					self.activeService.showApp( selected_data.id, selected_data.path );
					self.splashScreen.hide();
				} else {
					self.activeService.showSelect();
					self.splashScreen.hide();
				}
			}
		);
	}
}