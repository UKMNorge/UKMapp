import { Component } from '@angular/core';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/ukmnorge/utils/network.service';

@Component({
	selector: 'app-page-innstillinger',
	templateUrl: 'innstillinger.page.html',
	styleUrls: ['innstillinger.page.scss']
})
export class InnstillingerPage {
	public showOfflineButton = ConnectionStatus.Online;

	constructor(
		private activeService: ActiveService,
		private network: NetworkService
	) {

	}

	public networkToggle() {
		if( ConnectionStatus.Online ) {
			this.network.goOffline();
		} else {
			this.network.goOnline();
		}
	}

	public unsetFylke() {
		this.activeService.showSelect();
	}
}
