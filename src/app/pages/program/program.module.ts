import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramPage } from './program.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { HendelsePage } from './hendelse.page';
import { InnslagPage } from './innslag.page';
import { ArtikkelPage } from './artikkel.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild(
			[
				{ path: '', component: ProgramPage },
				{ path: ':hendelse', component: HendelsePage },
				{ path: ':hendelse/:innslag', component: InnslagPage },
				{ path: ':hendelse/:innslag/artikkel/:artikkel', component: ArtikkelPage}
			]
		),
		CommonComponentsModule
	],
	declarations: [
		ProgramPage,
		HendelsePage,
		InnslagPage,
		ArtikkelPage
	]
})
export class ProgramPageModule { }
