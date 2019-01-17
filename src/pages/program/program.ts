import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MonstringProgramProvider } from '../../providers/ukm/monstringprogram';
import { ProgramProvider } from '../../providers/ukm/program';
import { StorageProvider } from '../../providers/storage';
import { HendelsePage } from './hendelse';

@Component({
	selector: 'page-program',
	templateUrl: 'program.html'
})
export class ProgramPage {

	public mittprogram = ['12908', '12909', '12910', '12922', '12920'];//, 12921];

	public program: MonstringProgramProvider = null;

	constructor(
		public navCtrl: NavController,
		private programProvider: ProgramProvider,
		private storageProvider: StorageProvider
	) {

		this.storageProvider.unit('APP').get('monstring').then(
			(monstring_id) => {
				console.error('Load program!');
				this.program = this.programProvider.getMonstring(monstring_id);
				console.log(this.program);
			}
		);
		console.info('Program-load');
	}

	visHendelse(id) {
		this.navCtrl.push(
			HendelsePage,
			{
				id: id
			}
		)
	}

	visDetaljProgram(id) {
		/*
		this.navCtrl.push(
			InnslagPage,
			{
				id: id,
			}
		);
		*/
		alert('Show InnslagPage( ' + id + ' )');
	}

	updateMittprogram(hendelse_id, e) {
		var isChecked = e.checked;
		if(isChecked == true) {
			this.mittprogram.push(hendelse_id)
		} else if(isChecked == false) {
			this.mittprogram = this.mittprogram.filter(function(el){return el !== hendelse_id})
		}
		console.log(this.mittprogram);
		
	}
}

