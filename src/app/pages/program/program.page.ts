import { Component } from '@angular/core';
import { MonstringService } from 'src/app/services/ukmnorge/app/monstring.service';
import { ActiveService } from 'src/app/services/ukmnorge/app/active.service';
import { Hendelse } from 'src/app/services/ukmnorge/api/hendelse.models';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-program',
  templateUrl: 'program.page.html',
  styleUrls: ['program.page.scss']
})
export class ProgramPage {

	public program = null;

	constructor(
		private activeService: ActiveService,
		private monstringService: MonstringService,
		private navCtrl: NavController
	) {
	}

	ngOnInit() {
		this.monstringService.getHendelser().getMonstringProgram().subscribe(
			(hendelser: Hendelse[]) => {
				this.program = hendelser;
			}
		)
	}

	visHendelse( event, id ) {
		// Såfremt brukeren ikke trykket på ikonet, vis hendelsen
		if( !event.target.classList.contains('ukmico') ) {
			this.navCtrl.navigateForward('app/app/program/'+ id);
		}
	}
}
