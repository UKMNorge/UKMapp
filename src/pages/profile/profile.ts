import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Globals } from '../../providers/app/globals';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	constructor(public navCtrl: NavController, public globals: Globals ) {
	
	}
	
	unsetFylke() {
		this.globals.set('fylke',null);
	}
}
