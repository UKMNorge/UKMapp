import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { NetworkService, ConnectionStatus } from 'src/app/services/ukmnorge/utils/network.service';

@Component({
	selector: 'app-page-select',
	templateUrl: 'select.page.html',
	styleUrls: ['select.page.scss']
})
export class SelectPage {

	public monstringer = null;

	constructor(
		private monstringService: MonstringService,
		private activeService: ActiveService,
		private networkService: NetworkService
	) {
	}

	ngOnInit() {
		let self = this;
		// Hent alle mønstringer
		this.monstringService.getMonstringer().subscribe(
			data => {
				self.monstringer = data;
				console.log('DATA WAS', data);
			}
		);
	}

	velgMonstring(monstring) {
		console.log('SelectPage:velgMonstring', monstring);
		this.activeService.showApp( monstring.id, monstring.url );
	}
}
