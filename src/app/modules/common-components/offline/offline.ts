import { Component, Input } from '@angular/core';
import { NetworkService, ConnectionStatus } from 'src/app/services/ukmnorge/utils/network.service';


@Component({
  selector: 'offline',
  templateUrl: 'offline.html',
  styleUrls: ['./offline.scss']
})
export class OfflineComponent {
	public connected = true; // Assume online. Will soon enough loose the internet 😢

	constructor(
		private networkService: NetworkService
	) {
		this.bindConnectionStatus();
	}

	public bindConnectionStatus() {
		let self = this;
		this.networkService.change().subscribe(
			connectionStatus => {
				self.connected = connectionStatus == ConnectionStatus.Online;
			}
		);
	}
}
