import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-page-program-innslag-artikkel',
  templateUrl: 'artikkel.page.html',
  styleUrls: []
})
export class ArtikkelPage {

	public post_id = null;
	
	constructor(
		private activatedRoute: ActivatedRoute
	){
		let self = this;
		this.activatedRoute.paramMap.subscribe(
			(queryParams: ParamMap) => {
				self.post_id = queryParams.get('artikkel');
			}
		);
	}

	ngOnInit() {
	}
}
