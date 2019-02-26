import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Hendelse } from 'src/app/services/ukmnorge/api/hendelse.models';
import { Innslag } from 'src/app/services/ukmnorge/api/innslag.models';
import { NavController } from '@ionic/angular';
import { NetworkService } from 'src/app/services/ukmnorge/utils/network.service';

@Component({
  selector: 'app-page-program-hendelse',
  templateUrl: 'hendelse.page.html',
  styleUrls: ['hendelse.page.scss']
})
export class HendelsePage {

	private id = null;
	public innslag = null;
	public hendelse = null;
	public posts = null;


	constructor(
		private monstringService: MonstringService,
		private activatedRoute: ActivatedRoute,
		private navCtrl: NavController,
		private networkService: NetworkService
	) {
		let self = this;
		this.activatedRoute.paramMap.subscribe(
			(queryParams: ParamMap) => {
				self.id = queryParams.get('hendelse');
			}
		);
	}

	ngOnInit() {
		let self = this;
		
		this.monstringService.getHendelser().get( this.id ).subscribe(
			(hendelse: Hendelse) => {
				self.hendelse = hendelse;
				
				// Hvis det er en kategori, last inn alle posts
				if( hendelse.type == 'category' ) {
					self.monstringService.getPosts().getCategory( hendelse.category_id ).subscribe(
						(list) => {
							self.posts = list;
						}
					)
				}
			}
		);

		this.monstringService.getInnslag().getHendelse( this.id ).subscribe(
			(innslag: Innslag[]) => {
				self.innslag = innslag;
			}
		);
	}

	visInnslag(id) {
		this.navCtrl.navigateForward('app/app/program/hendelse/'+ this.id +'/innslag/'+ id);
	}

	visNyhet( id ) {
		this.navCtrl.navigateForward('app/app/program/hendelse/'+ this.id +'/post/' + id);
	}
}