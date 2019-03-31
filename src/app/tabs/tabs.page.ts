import { Component } from '@angular/core';
import { NetworkService } from '../services/ukmnorge/utils/network.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

	public infoWarning = false;

	constructor(
		private networkService: NetworkService
	) {
		let self = this;

		networkService.change().subscribe(
			( status ) => {
				if( status ) {
					self.showWarning();
				} else {
					self.hideWarning();
				}
			}
		);
	}


	public showWarning() {
		//console.log('INFO SHOW LABEL WARNING');
		this.infoWarning = true;
	}
	public hideWarning() {
		//console.log('INFO HIDE LABEL WARNING');
		this.infoWarning = false;
	}
}
