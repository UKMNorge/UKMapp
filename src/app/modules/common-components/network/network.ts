import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/ukmnorge/utils/network.service';

@Component({
	selector: 'online',
	templateUrl: 'online.html',
	styleUrls: ['./network.scss']
})
export class OnlineComponent {
	constructor(
		private networkService: NetworkService
	) {
	}
}

@Component({
	selector: 'offline',
	templateUrl: 'offline.html',
	styleUrls: ['./network.scss']
})
export class OfflineComponent {
	constructor(
		private networkService: NetworkService
	) {
	}
}