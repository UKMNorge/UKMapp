import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { Hendelse } from 'src/app/services/ukmnorge/api/hendelse.models';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Innslag, InnslagDetaljer } from 'src/app/services/ukmnorge/api/innslag.models';

@Component({
	selector: 'app-page-program-innslag',
	templateUrl: 'innslag.page.html',
	styleUrls: ['innslag.page.scss']
})
export class InnslagPage {

	private id = null;
	public innslag = null;
	public detaljer = null;

	constructor(
		private monstringService: MonstringService,
		private activatedRoute: ActivatedRoute
	) {
		let self = this;
		this.activatedRoute.paramMap.subscribe(
			(queryParams: ParamMap) => {
				self.id = queryParams.get('innslag');
			}
		);
	}

	ngOnInit() {
		let self = this;
		this.monstringService.getInnslag().get( this.id ).subscribe(
			(innslag) => {
				self.innslag = innslag;
			}
		);

		this.monstringService.getInnslag().getDetaljer( this.id ).subscribe(
			(innslagDetaljer: InnslagDetaljer) => {
				self.detaljer = innslagDetaljer;
			}
		);
	}
}