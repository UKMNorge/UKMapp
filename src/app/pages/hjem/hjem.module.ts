import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HjemPage } from './hjem.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { PostPage } from '../post/post.page';
import { PostPageModule } from '../post/post.module';
import { InnslagPage } from '../innslag/innslag.page';
import { InnslagPageModule } from '../innslag/innslag.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		InnslagPageModule,
		PostPageModule,
		RouterModule.forChild(
			[
				{ path: '', component: HjemPage },
				{ path: 'nyhet/:post_id', component: PostPage },
				{ path: 'innslag/:innslag', component: InnslagPage}
			]
		),
		CommonComponentsModule
	],
	declarations: [
		HjemPage
	]
})
export class HjemPageModule { }
