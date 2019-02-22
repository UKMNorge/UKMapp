import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { NavController, NavParams } from '@ionic/angular';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-page-info-single',
  templateUrl: 'single.page.html',
  styleUrls: ['info.page.scss']
})
export class SinglePage {

	public post_id = null;
	
	constructor(
		private activeService: ActiveService,
		private activatedRoute: ActivatedRoute
	){
		let self = this;
		this.activatedRoute.paramMap.subscribe(
			(queryParams: ParamMap) => {
				self.post_id = queryParams.get('id');
			}
		);
	}

	ngOnInit() {
	}
}
