import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Globals } from '../../providers/app/globals';

import { MonstringProvider } from '../../providers/ukmnorge/monstring';
//import { PostsProvider } from '../../providers/ukmnorge/posts';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
	public monstring = null;
	
	constructor(public navCtrl: NavController, private monstringProvider: MonstringProvider, public globals: Globals ) {
		this.loadMonstring( this.globals.get('monstring_id') );
	}
	
	visKart() {
		this.navCtrl.push( MapPage );
	}
	
	loadMonstring( monstring_id ) {
		console.log('HomePage:loadMonstring( '+ monstring_id +' )');
		
		if( monstring_id == null ) {
			this.monstring = null;
			return;
		}
		
		this.monstringProvider.getMonstring( monstring_id )
			.then( data => {
				console.log('THEN: HomePage:loadMonstring( '+ monstring_id +' ) => ');
				console.log( data );
				this.monstring = data;
			}
		);
	}
}