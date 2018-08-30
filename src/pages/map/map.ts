import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {
	constructor(public navCtrl: NavController, public storage: Storage ) {
	}
	
}