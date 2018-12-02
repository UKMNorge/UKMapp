import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProgramProvider } from '../../providers/ukm/program';
import { HendelseProvider } from '../../providers/ukm/hendelse';
import { HttpClient } from '@angular/common/http';
import { StorageProvider } from '../../providers/storage';

@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {
	public programProvider:ProgramProvider;

	constructor(
		public navCtrl: NavController,
		private hendelseProvider: HendelseProvider,
		httpClient: HttpClient,
		private storageProvider: StorageProvider
	) {

		this.storageProvider.unit('APP').get('monstring').then( 
			(monstring_id) => {
				this.programProvider = new ProgramProvider( monstring_id, this.hendelseProvider, httpClient, this.storageProvider );
			}
		);
		console.info('Program-load');
	}

	visDetaljProgram( id ) {
		alert('hei ' + id);
	}
}