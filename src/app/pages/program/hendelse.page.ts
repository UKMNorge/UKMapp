import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Hendelse } from 'src/app/services/ukmnorge/api/hendelse.models';
import { Innslag } from 'src/app/services/ukmnorge/api/innslag.models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-program-hendelse',
  templateUrl: 'hendelse.page.html',
  styleUrls: ['hendelse.page.scss']
})
export class HendelsePage {

	private id = null;
	public innslag = null;
	public hendelse = null;


	constructor(
		private activeService: ActiveService,
		private monstringService: MonstringService,
		private activatedRoute: ActivatedRoute,
		private navCtrl: NavController
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
}