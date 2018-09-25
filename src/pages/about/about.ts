import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Globals } from '../../providers/app/globals';
import { InfoProvider } from '../../providers/ukmnorge/info';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(
    public navCtrl: NavController,
    public globals: Globals,
    public infoProvider: InfoProvider
  ){
    this.infoProvider.getMenuItems().then( (data) => {
			console.log(data);
		});
  }
  visSide( url ) {
		//let url = 'https://ukm.no/'+ this.globals.get('fylke').link +'/pameldte/'+ id +'/';
		//alert(id);
    alert(url)
		this.navCtrl.push(
			SidePage,
			{
				url: url,
			}
		)
	}
}

@Component({
  selector: 'page-side',
  templateUrl: 'side.html'
})
export class SidePage {
  constructor(
    public navCtrl: NavController,
    public globals: Globals,
    public infoProvider: InfoProvider
  ){
    let sideUrl = this.navParams.get('url');
    console.log(sideUrl)
    this.infoProvider.getSideMarkup( sideUrl ).then( (data) => {
      console.log("Got markup: " + data);
    });
  }
}
