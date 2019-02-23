import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './info.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { PostPage } from '../post/post.page';
import { PostPageModule } from '../post/post.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		PostPageModule,
		RouterModule.forChild(
			[
				{ path: '', component: InfoPage, pathMatch: 'full' }//,
				//{ path: 'single/:id', component: PostPage, pathMatch: 'full' }
			]
		),
		CommonComponentsModule
	],
	declarations: [
		InfoPage
	]
})
export class InfoPageModule { }
