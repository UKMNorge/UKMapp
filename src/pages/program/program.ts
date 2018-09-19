import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { Globals } from '../../providers/app/globals';

import { ProgramProvider } from '../../providers/ukmnorge/program';

@Component({
	selector: 'page-hendelse',
	templateUrl: 'hendelse.html'
})
export class HendelsePage {
	constructor(
		private navParams: NavParams,
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider
	) {
		let id = this.navParams.get('id');

		this.programProvider.getProgram( id ).then( (data) => {
			console.log(data);
		});
	}
	visInnslag( id ) {
		//let url = 'https://ukm.no/'+ this.globals.get('fylke').link +'/pameldte/'+ id +'/';
		//alert(id);
		this.navCtrl.push(
			InnslagPage,
			{
				innslagId: id,
			}
		)
	}
}

@Component({
  selector: 'page-innslag',
  templateUrl: 'innslag.html'
})
export class InnslagPage {
	constructor(
		private navParams: NavParams,
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider
	) {
		let innslagId = this.navParams.get('innslagId');
		this.programProvider.getInnslagDetalj( innslagId ).then( (data) => {
			console.log("Got innslag: " + data);
		});
	}
}

@Component({
  selector: 'page-program',
  templateUrl: 'program.html'
})
export class ProgramPage {

	constructor(
		public navCtrl: NavController,
		public globals: Globals,
		public programProvider: ProgramProvider
	) {
		console.info('Program-load');
		this.programProvider.get().then( (data) => {
			console.log(data);
		});
	}

	visDetaljProgram( id ) {
		this.navCtrl.push(
			HendelsePage,
			{
				id: id,
			}
		);
	}
}
