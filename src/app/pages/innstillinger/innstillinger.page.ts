import { Component } from '@angular/core';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/ukmnorge/utils/network.service';

@Component({
	selector: 'app-page-innstillinger',
	templateUrl: 'innstillinger.page.html',
	styleUrls: ['innstillinger.page.scss']
})
export class InnstillingerPage {
	public path = null;

	constructor(
		private activeService: ActiveService,
		private networkService: NetworkService
	) {
		let self = this;
		this.path = this.activeService.getPath();
	}

	public networkToggle() {
		if ( this.networkService.isOnline() ) {
			this.networkService.goOffline();
		} else {
			this.networkService.goOnline();
		}
	}

	public unsetFylke() {
		this.activeService.showSelect();
	}
}
