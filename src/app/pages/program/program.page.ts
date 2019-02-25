import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { Hendelse } from 'src/app/services/ukmnorge/api/hendelse.models';
import { NavController } from '@ionic/angular';
import { Monstring } from 'src/app/services/ukmnorge/api/monstring.models';

@Component({
  selector: 'app-page-program',
  templateUrl: 'program.page.html',
  styleUrls: ['program.page.scss']
})
export class ProgramPage {

	public program = null;
	public monstring = null;

	constructor(
		private monstringService: MonstringService,
		private navCtrl: NavController
	) {
	}

	ngOnInit() {
		let self = this;
		this.monstringService.getHendelser().getMonstringProgram().subscribe(
			(hendelser: Hendelse[]) => {
				self.program = hendelser;

				if( !Array.isArray( hendelser ) || ( Array.isArray(hendelser) && hendelser.length == 0 )) {
					self.monstringService.getInfo().subscribe(
						(monstring: Monstring) => {
							self.monstring = monstring;
						}
					)
				}
			}
		)
	}

	visHendelse( event, id ) {
		// Såfremt brukeren ikke trykket på ikonet, vis hendelsen
		if( !event.target.classList.contains('ukmico') ) {
			this.navCtrl.navigateForward('app/app/program/hendelse/'+ id);
		}
	}
}
