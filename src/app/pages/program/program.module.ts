import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramPage } from './program.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { HendelsePage } from './hendelse.page';
import { InnslagPage } from '../innslag/innslag.page';
import { InnslagPageModule } from '../innslag/innslag.module';
import { PostPage } from '../post/post.page';
import { PostPageModule } from '../post/post.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		InnslagPageModule,
		PostPageModule,
		RouterModule.forChild(
			[
				{ path: '', component: ProgramPage, pathMatch: 'full' },
				{ path: 'hendelse/:hendelse', component: HendelsePage, pathMatch: 'full' },
				{ path: 'hendelse/:hendelse/innslag/:innslag', component: InnslagPage, pathMatch: 'full' },
				{ path: 'hendelse/:hendelse/innslag/:innslag/post/:post_id', component: PostPage, pathMatch: 'full'}
			]
		),
		CommonComponentsModule
	],
	declarations: [
		ProgramPage,
		HendelsePage
	]
})
export class ProgramPageModule { }
